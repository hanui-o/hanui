import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * File with metadata
 */
export interface UploadedFile {
  file: File;
  id: string;
  preview?: string;
  progress?: number;
  error?: string;
}

/**
 * FileUpload Props Interface
 */
export interface FileUploadProps {
  /**
   * Accept file types (e.g., ".pdf,.hwp,.jpg,.png")
   */
  accept?: string;

  /**
   * Maximum file size in bytes
   */
  maxSize?: number;

  /**
   * Maximum number of files
   */
  maxFiles?: number;

  /**
   * Allow multiple file selection
   * @default false
   */
  multiple?: boolean;

  /**
   * Callback when files are selected/dropped
   */
  onUpload?: (files: File[]) => void | Promise<void>;

  /**
   * Callback when files change (added/removed)
   */
  onChange?: (files: UploadedFile[]) => void;

  /**
   * Callback when validation errors occur
   */
  onError?: (error: string) => void;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Custom label text
   */
  label?: string;

  /**
   * Show file list
   * @default true
   */
  showFileList?: boolean;
}

/**
 * Format bytes to human readable size
 */
function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Get file extension
 */
function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

/**
 * Check if file is an image
 */
function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * FileUpload Component
 *
 * KRDS-compliant file upload with drag & drop, validation, and accessibility
 *
 * @example
 * ```tsx
 * <FileUpload
 *   accept=".pdf,.hwp,.jpg,.png"
 *   maxSize={10 * 1024 * 1024}
 *   maxFiles={5}
 *   multiple
 *   onUpload={(files) => console.log(files)}
 *   onError={(error) => console.error(error)}
 * />
 * ```
 */
export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      accept,
      maxSize,
      maxFiles = 5,
      multiple = false,
      onUpload,
      onChange,
      onError,
      disabled = false,
      className,
      label = '파일을 드래그하거나 클릭하여 업로드하세요',
      showFileList = true,
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const dragCounter = React.useRef(0);

    /**
     * Validate file
     */
    const validateFile = React.useCallback(
      (file: File): string | null => {
        // Check file size
        if (maxSize && file.size > maxSize) {
          return `파일 크기가 ${formatBytes(maxSize)}를 초과했습니다.`;
        }

        // Check file extension
        if (accept) {
          const acceptedExtensions = accept.split(',').map((ext) => ext.trim());
          const fileExtension = '.' + getFileExtension(file.name);
          const isAccepted = acceptedExtensions.some(
            (ext) =>
              ext === fileExtension ||
              ext === file.type ||
              (ext.startsWith('.') && fileExtension === ext)
          );

          if (!isAccepted) {
            return `허용되지 않는 파일 형식입니다. (${acceptedExtensions.join(', ')})`;
          }
        }

        return null;
      },
      [accept, maxSize]
    );

    /**
     * Process files
     */
    const processFiles = React.useCallback(
      async (fileList: FileList | File[]) => {
        const fileArray = Array.from(fileList);

        // Check max files limit
        if (files.length + fileArray.length > maxFiles) {
          onError?.(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
          return;
        }

        const newFiles: UploadedFile[] = [];
        const validFiles: File[] = [];

        for (const file of fileArray) {
          const error = validateFile(file);

          if (error) {
            onError?.(error);
            continue;
          }

          const id = `${file.name}-${Date.now()}-${Math.random()}`;
          let preview: string | undefined;

          // Generate preview for images
          if (isImageFile(file)) {
            preview = URL.createObjectURL(file);
          }

          newFiles.push({
            file,
            id,
            preview,
            progress: 0,
          });

          validFiles.push(file);
        }

        if (newFiles.length > 0) {
          const updatedFiles = [...files, ...newFiles];
          setFiles(updatedFiles);
          onChange?.(updatedFiles);

          // Call onUpload callback
          if (onUpload) {
            try {
              await onUpload(validFiles);
              // Update progress to 100% after successful upload
              setFiles((prev) =>
                prev.map((f) =>
                  newFiles.some((nf) => nf.id === f.id)
                    ? { ...f, progress: 100 }
                    : f
                )
              );
            } catch (err) {
              onError?.(
                err instanceof Error
                  ? err.message
                  : '파일 업로드에 실패했습니다.'
              );
            }
          }
        }
      },
      [files, maxFiles, validateFile, onChange, onUpload, onError]
    );

    /**
     * Handle file input change
     */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
        // Reset input value to allow re-uploading the same file
        e.target.value = '';
      }
    };

    /**
     * Handle drag events
     */
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current++;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current--;
      if (dragCounter.current === 0) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter.current = 0;

      if (disabled) return;

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    };

    /**
     * Handle click to open file dialog
     */
    const handleClick = () => {
      if (!disabled) {
        inputRef.current?.click();
      }
    };

    /**
     * Handle keyboard navigation
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    };

    /**
     * Remove file
     */
    const removeFile = (id: string) => {
      setFiles((prev) => {
        const file = prev.find((f) => f.id === id);
        if (file?.preview) {
          URL.revokeObjectURL(file.preview);
        }
        const updated = prev.filter((f) => f.id !== id);
        onChange?.(updated);
        return updated;
      });
    };

    /**
     * Cleanup preview URLs on unmount
     */
    React.useEffect(() => {
      return () => {
        files.forEach((file) => {
          if (file.preview) {
            URL.revokeObjectURL(file.preview);
          }
        });
      };
    }, [files]);

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {/* Drop Zone */}
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="파일 업로드"
          aria-disabled={disabled}
          className={cn(
            'relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-[#256ef4] focus:border-transparent',
            isDragging && !disabled && 'border-[#256ef4] bg-blue-50',
            !isDragging && !disabled && 'border-gray-300 hover:border-gray-400',
            disabled &&
              'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
          )}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            disabled={disabled}
            className="sr-only"
            aria-hidden="true"
          />

          {/* Upload Icon */}
          <svg
            className={cn(
              'mx-auto h-12 w-12 mb-4',
              disabled ? 'text-gray-300' : 'text-gray-400'
            )}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Label */}
          <p
            className={cn(
              'text-sm',
              disabled ? 'text-gray-400' : 'text-gray-600'
            )}
          >
            {label}
          </p>

          {/* File Info */}
          {(accept || maxSize) && (
            <p className="mt-2 text-xs text-gray-500">
              {accept && <span>형식: {accept}</span>}
              {accept && maxSize && <span> · </span>}
              {maxSize && <span>최대 크기: {formatBytes(maxSize)}</span>}
            </p>
          )}
        </div>

        {/* File List */}
        {showFileList && files.length > 0 && (
          <ul className="mt-4 space-y-2" aria-label="업로드된 파일 목록">
            {files.map((uploadedFile) => (
              <li
                key={uploadedFile.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-md border',
                  uploadedFile.error
                    ? 'border-red-200 bg-red-50'
                    : 'border-gray-200 bg-gray-50'
                )}
              >
                {/* Preview or Icon */}
                {uploadedFile.preview ? (
                  <img
                    src={uploadedFile.preview}
                    alt=""
                    className="h-12 w-12 object-cover rounded"
                  />
                ) : (
                  <div className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded">
                    <svg
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                )}

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatBytes(uploadedFile.file.size)}
                  </p>

                  {/* Progress Bar */}
                  {uploadedFile.progress !== undefined &&
                    uploadedFile.progress < 100 && (
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-[#256ef4] h-1.5 rounded-full transition-all"
                          style={{ width: `${uploadedFile.progress}%` }}
                        />
                      </div>
                    )}

                  {/* Error Message */}
                  {uploadedFile.error && (
                    <p className="mt-1 text-xs text-red-600">
                      {uploadedFile.error}
                    </p>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeFile(uploadedFile.id)}
                  className={cn(
                    'p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-200',
                    'focus:outline-none focus:ring-2 focus:ring-[#256ef4]'
                  )}
                  aria-label={`${uploadedFile.file.name} 삭제`}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';
