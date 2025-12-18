// Form Kit - FileUploadField Component
// 파일 업로드 필드 컴포넌트

'use client';

import { useRef, useCallback } from 'react';
import { Button, Progress } from '@hanui/react';
import { Upload, X, File, Image } from 'lucide-react';

interface FileUploadFieldProps {
  file: File | null;
  preview: string | null;
  progress: number;
  isUploading: boolean;
  error: string | null;
  onSelect: (file: File) => boolean;
  onUpload: () => Promise<string | null>;
  onCancel: () => void;
  onReset: () => void;
  accept?: string;
  maxSize?: number;
  label?: string;
  description?: string;
}

export function FileUploadField({
  file,
  preview,
  progress,
  isUploading,
  error,
  onSelect,
  onUpload,
  onCancel,
  onReset,
  accept = 'image/*',
  maxSize = 10 * 1024 * 1024,
  label = '파일 업로드',
  description,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        onSelect(selectedFile);
      }
      // 같은 파일 다시 선택 가능하도록 초기화
      e.target.value = '';
    },
    [onSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) {
        onSelect(droppedFile);
      }
    },
    [onSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-krds-gray-90">{label}</label>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        aria-hidden="true"
      />

      {!file ? (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`
            border-2 border-dashed border-krds-gray-30 rounded-lg p-8
            flex flex-col items-center justify-center gap-2
            cursor-pointer hover:border-krds-primary-base hover:bg-krds-primary-5
            transition-colors
          `}
        >
          <Upload className="w-10 h-10 text-krds-gray-40" />
          <p className="text-sm text-krds-gray-70">
            클릭하거나 파일을 드래그하세요
          </p>
          {description && (
            <p className="text-xs text-krds-gray-50">{description}</p>
          )}
          <p className="text-xs text-krds-gray-40">
            최대 {formatSize(maxSize)}
          </p>
        </div>
      ) : (
        <div className="border border-krds-gray-20 rounded-lg p-4">
          <div className="flex items-start gap-4">
            {/* 미리보기 */}
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-16 h-16 object-cover rounded"
              />
            ) : (
              <div className="w-16 h-16 bg-krds-gray-10 rounded flex items-center justify-center">
                {file.type.startsWith('image/') ? (
                  <Image className="w-8 h-8 text-krds-gray-40" />
                ) : (
                  <File className="w-8 h-8 text-krds-gray-40" />
                )}
              </div>
            )}

            {/* 파일 정보 */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-krds-gray-90 truncate">
                {file.name}
              </p>
              <p className="text-xs text-krds-gray-50">
                {formatSize(file.size)}
              </p>

              {/* 업로드 진행률 */}
              {isUploading && (
                <div className="mt-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-krds-gray-50 mt-1">
                    {progress}% 업로드 중...
                  </p>
                </div>
              )}

              {/* 에러 메시지 */}
              {error && (
                <p className="text-xs text-krds-danger-base mt-1">{error}</p>
              )}
            </div>

            {/* 액션 버튼 */}
            <div className="flex gap-2">
              {isUploading ? (
                <Button variant="outline" size="sm" onClick={onCancel}>
                  취소
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={onReset}>
                    <X className="w-4 h-4" />
                  </Button>
                  <Button size="sm" onClick={onUpload}>
                    <Upload className="w-4 h-4 mr-1" />
                    업로드
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
