<script setup lang="ts">
import { ref } from 'vue';
import { Upload, X, Download, Eye, Loader2, CheckCircle2 } from 'lucide-vue-next';
import { cn } from '../lib/utils';
import Button from './Button.vue';

export type FileUploadStatus = 'idle' | 'uploading' | 'complete' | 'error';

export interface UploadedFile {
  file: File;
  id: string;
  status: FileUploadStatus;
  progress?: number;
  error?: string;
  preview?: string;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
    multiple?: boolean;
    disabled?: boolean;
    bordered?: boolean;
    uploadButtonText?: string;
    instructionText?: string;
    showDeleteAll?: boolean;
    deleteAllText?: string;
    class?: string;
  }>(),
  {
    title: '파일 첨부',
    maxFiles: 5,
    multiple: false,
    disabled: false,
    bordered: false,
    uploadButtonText: '파일 선택',
    instructionText: '파일을 선택하거나 끌어다 놓으세요',
    showDeleteAll: true,
    deleteAllText: '전체 삭제',
  }
);

const emit = defineEmits<{
  upload: [files: File[]];
  change: [files: UploadedFile[]];
  error: [error: string];
  remove: [file: UploadedFile];
  preview: [file: UploadedFile];
  download: [file: UploadedFile];
}>();

const files = ref<UploadedFile[]>([]);
const isDragging = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const dragCounter = ref(0);

const formatBytes = (bytes: number, decimals = 1): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

const validateFile = (file: File): string | null => {
  if (props.maxSize && file.size > props.maxSize) {
    return `파일 크기가 ${formatBytes(props.maxSize)}를 초과합니다.`;
  }
  if (props.accept) {
    const acceptedExtensions = props.accept.split(',').map((ext) => ext.trim());
    const fileExtension = '.' + getFileExtension(file.name);
    const isAccepted = acceptedExtensions.some(
      (ext) => ext === fileExtension || ext === file.type || (ext.startsWith('.') && fileExtension === ext)
    );
    if (!isAccepted) {
      return `허용되지 않는 파일 형식입니다. (${acceptedExtensions.join(', ')})`;
    }
  }
  return null;
};

const processFiles = async (fileList: FileList | File[]) => {
  const fileArray = Array.from(fileList);

  if (files.value.length + fileArray.length > props.maxFiles) {
    emit('error', `최대 ${props.maxFiles}개 파일만 업로드 가능합니다.`);
    return;
  }

  const newFiles: UploadedFile[] = [];
  const validFiles: File[] = [];

  for (const file of fileArray) {
    const error = validateFile(file);
    const id = `${file.name}-${Date.now()}-${Math.random()}`;
    let preview: string | undefined;

    if (isImageFile(file)) {
      preview = URL.createObjectURL(file);
    }

    if (error) {
      newFiles.push({ file, id, status: 'error', error, preview });
      emit('error', error);
    } else {
      newFiles.push({ file, id, status: 'uploading', progress: 0, preview });
      validFiles.push(file);
    }
  }

  if (newFiles.length > 0) {
    files.value = [...files.value, ...newFiles];
    emit('change', files.value);

    if (validFiles.length > 0) {
      emit('upload', validFiles);
      // Simulate upload completion
      setTimeout(() => {
        files.value = files.value.map((f) =>
          newFiles.some((nf) => nf.id === f.id && f.status === 'uploading')
            ? { ...f, status: 'complete' as FileUploadStatus, progress: 100 }
            : f
        );
        emit('change', files.value);
      }, 1000);
    }
  }
};

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    processFiles(target.files);
    target.value = '';
  }
};

const handleDragEnter = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  dragCounter.value++;
  if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
    isDragging.value = true;
  }
};

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  dragCounter.value--;
  if (dragCounter.value === 0) {
    isDragging.value = false;
  }
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = false;
  dragCounter.value = 0;

  if (props.disabled) return;

  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    processFiles(e.dataTransfer.files);
  }
};

const handleUploadClick = () => {
  if (!props.disabled) {
    inputRef.value?.click();
  }
};

const removeFile = (uploadedFile: UploadedFile) => {
  if (uploadedFile.preview) {
    URL.revokeObjectURL(uploadedFile.preview);
  }
  files.value = files.value.filter((f) => f.id !== uploadedFile.id);
  emit('change', files.value);
  emit('remove', uploadedFile);
};

const removeAllFiles = () => {
  files.value.forEach((file) => {
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
  });
  files.value = [];
  emit('change', []);
};
</script>

<template>
  <div
    :class="
      cn(
        'krds-file-upload',
        bordered && 'line border border-krds-gray-30 rounded-lg p-6',
        props.class
      )
    "
  >
    <!-- Header Section -->
    <div class="file-head mb-4">
      <h3 class="text-krds-body-lg font-semibold text-krds-gray-95 mb-2">
        {{ title }}
      </h3>
      <p v-if="description" class="text-krds-body-sm text-krds-gray-70">
        {{ description }}
      </p>
    </div>

    <!-- Upload Area -->
    <div
      :class="
        cn(
          'file-upload border-2 border-dashed rounded-lg p-6 text-center transition-colors',
          isDragging && !disabled && 'border-krds-primary-50 bg-krds-primary-5',
          !isDragging && !disabled && 'border-krds-gray-30',
          disabled && 'border-krds-gray-20 bg-krds-gray-5 opacity-60'
        )
      "
      @dragenter="handleDragEnter"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <input
        ref="inputRef"
        type="file"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        class="sr-only"
        :aria-label="uploadButtonText"
        @change="handleFileChange"
      />

      <p class="text-krds-body-md text-krds-gray-70 mb-4">
        {{ instructionText }}
      </p>

      <Button size="md" variant="primary" :disabled="disabled" @click="handleUploadClick">
        <template #iconLeft>
          <Upload :size="16" />
        </template>
        {{ uploadButtonText }}
      </Button>

      <!-- File Info -->
      <p v-if="accept || maxSize" class="mt-3 text-krds-body-sm text-krds-gray-60">
        <span v-if="accept">형식: {{ accept }}</span>
        <span v-if="accept && maxSize"> · </span>
        <span v-if="maxSize">최대 크기: {{ formatBytes(maxSize) }}</span>
      </p>
    </div>

    <!-- File List -->
    <div v-if="files.length > 0" class="file-list mt-6">
      <ul class="upload-list space-y-3" aria-label="업로드된 파일 목록">
        <li
          v-for="uploadedFile in files"
          :key="uploadedFile.id"
          :class="
            cn(
              'flex items-center gap-4 p-4 rounded-lg border',
              uploadedFile.status === 'error'
                ? 'border-krds-danger-base bg-krds-danger-5'
                : 'border-krds-gray-30 bg-krds-gray-5'
            )
          "
        >
          <!-- File Info Section -->
          <div class="file-info flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <p class="font-medium text-krds-body-md text-krds-gray-95 truncate">
                {{ uploadedFile.file.name }}
              </p>
              <Loader2
                v-if="uploadedFile.status === 'uploading'"
                class="h-4 w-4 animate-spin text-krds-primary-50"
              />
              <CheckCircle2
                v-if="uploadedFile.status === 'complete'"
                class="h-4 w-4 text-krds-success-base"
              />
            </div>
            <p class="text-krds-body-sm text-krds-gray-60 mt-1">
              {{ formatBytes(uploadedFile.file.size) }}
            </p>

            <!-- Progress Bar -->
            <div
              v-if="uploadedFile.status === 'uploading' && uploadedFile.progress !== undefined"
              class="mt-2 w-full bg-krds-gray-20 rounded-full h-1.5"
            >
              <div
                class="bg-krds-primary-50 h-1.5 rounded-full transition-all"
                :style="{ width: `${uploadedFile.progress}%` }"
              />
            </div>

            <!-- Error Message -->
            <p
              v-if="uploadedFile.error"
              class="mt-2 text-krds-body-sm text-krds-danger-base"
            >
              {{ uploadedFile.error }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="btn-wrap flex items-center gap-2">
            <Button
              v-if="uploadedFile.preview"
              size="sm"
              variant="ghost"
              @click="emit('preview', uploadedFile)"
            >
              <template #iconLeft>
                <Eye :size="16" />
              </template>
              미리보기
            </Button>

            <Button
              v-if="uploadedFile.status === 'complete'"
              size="sm"
              variant="ghost"
              @click="emit('download', uploadedFile)"
            >
              <template #iconLeft>
                <Download :size="16" />
              </template>
              다운로드
            </Button>

            <Button size="sm" variant="ghost" @click="removeFile(uploadedFile)">
              <template #iconLeft>
                <X :size="16" />
              </template>
              삭제
            </Button>
          </div>
        </li>
      </ul>

      <!-- Delete All Button -->
      <div v-if="showDeleteAll && files.length > 1" class="mt-4 flex justify-end">
        <Button size="sm" variant="tertiary" @click="removeAllFiles">
          {{ deleteAllText }}
        </Button>
      </div>
    </div>
  </div>
</template>
