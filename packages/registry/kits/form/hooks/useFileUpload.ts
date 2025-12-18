// Form Kit - File Upload Hook
// 파일 업로드 관리 hook

import { useState, useCallback } from 'react';
import axios from 'axios';

interface FileUploadOptions {
  uploadUrl: string;
  maxSize?: number; // bytes
  allowedTypes?: string[];
  onProgress?: (progress: number) => void;
  onSuccess?: (response: unknown) => void;
  onError?: (error: string) => void;
}

interface FileUploadState {
  file: File | null;
  preview: string | null;
  progress: number;
  isUploading: boolean;
  error: string | null;
  uploadedUrl: string | null;
}

interface UseFileUploadReturn extends FileUploadState {
  selectFile: (file: File) => boolean;
  upload: () => Promise<string | null>;
  cancel: () => void;
  reset: () => void;
}

export function useFileUpload(options: FileUploadOptions): UseFileUploadReturn {
  const {
    uploadUrl,
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = ['image/*', 'application/pdf'],
    onProgress,
    onSuccess,
    onError,
  } = options;

  const [state, setState] = useState<FileUploadState>({
    file: null,
    preview: null,
    progress: 0,
    isUploading: false,
    error: null,
    uploadedUrl: null,
  });

  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      // 크기 검증
      if (file.size > maxSize) {
        return `파일 크기는 ${Math.round(maxSize / 1024 / 1024)}MB 이하여야 합니다`;
      }

      // 타입 검증
      const isAllowed = allowedTypes.some((type) => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.replace('/*', '/'));
        }
        return file.type === type;
      });

      if (!isAllowed) {
        return '허용되지 않는 파일 형식입니다';
      }

      return null;
    },
    [maxSize, allowedTypes]
  );

  const selectFile = useCallback(
    (file: File): boolean => {
      const error = validateFile(file);
      if (error) {
        setState((prev) => ({ ...prev, error }));
        onError?.(error);
        return false;
      }

      // 이미지 미리보기 생성
      let preview: string | null = null;
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }

      setState({
        file,
        preview,
        progress: 0,
        isUploading: false,
        error: null,
        uploadedUrl: null,
      });

      return true;
    },
    [validateFile, onError]
  );

  const upload = useCallback(async (): Promise<string | null> => {
    if (!state.file) {
      setState((prev) => ({ ...prev, error: '파일을 선택해주세요' }));
      return null;
    }

    const controller = new AbortController();
    setAbortController(controller);

    const formData = new FormData();
    formData.append('file', state.file);

    setState((prev) => ({
      ...prev,
      isUploading: true,
      error: null,
      progress: 0,
    }));

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        signal: controller.signal,
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded / progressEvent.total) * 100)
            : 0;
          setState((prev) => ({ ...prev, progress }));
          onProgress?.(progress);
        },
      });

      const uploadedUrl = response.data.url;
      setState((prev) => ({
        ...prev,
        isUploading: false,
        progress: 100,
        uploadedUrl,
      }));
      onSuccess?.(response.data);
      return uploadedUrl;
    } catch (error) {
      if (axios.isCancel(error)) {
        setState((prev) => ({ ...prev, isUploading: false, progress: 0 }));
        return null;
      }

      const errorMessage = '파일 업로드 중 오류가 발생했습니다';
      setState((prev) => ({
        ...prev,
        isUploading: false,
        error: errorMessage,
      }));
      onError?.(errorMessage);
      return null;
    } finally {
      setAbortController(null);
    }
  }, [state.file, uploadUrl, onProgress, onSuccess, onError]);

  const cancel = useCallback(() => {
    abortController?.abort();
    setState((prev) => ({ ...prev, isUploading: false, progress: 0 }));
  }, [abortController]);

  const reset = useCallback(() => {
    if (state.preview) {
      URL.revokeObjectURL(state.preview);
    }
    abortController?.abort();
    setState({
      file: null,
      preview: null,
      progress: 0,
      isUploading: false,
      error: null,
      uploadedUrl: null,
    });
  }, [state.preview, abortController]);

  return {
    ...state,
    selectFile,
    upload,
    cancel,
    reset,
  };
}
