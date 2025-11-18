'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

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
 * **Foundation Layer Features:**
 * - Semantic HTML: Proper button role and ARIA attributes
 * - WCAG 2.1 / KWCAG 2.2 Compliance: Keyboard navigation and focus management
 * - Screen Reader Support: Descriptive aria-labels and file list
 * - Drag & Drop: Native HTML5 drag and drop with visual feedback
 * - Dark Mode: Automatic dark mode support with optimized colors
 *
 * **Design Principles:**
 * - Client-side validation (file type, size, count)
 * - Image preview generation for uploaded images
 * - Progress tracking support
 * - Clear error states and messaging
 * - Keyboard accessible (Enter/Space to open file dialog)
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
      label = 'Drag files here or click to upload',
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
          return `File size exceeds ${formatBytes(maxSize)}.`;
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
            return `File type not allowed. (${acceptedExtensions.join(', ')})`;
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
          onError?.(`Maximum ${maxFiles} files allowed.`);
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
                err instanceof Error ? err.message : 'File upload failed.'
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
          aria-label="File upload"
          aria-disabled={disabled}
          className={cn(
            'relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
            'focus:outline-none focus:ring-2',
            'focus:ring-blue-600 dark:focus:ring-blue-400',
            'focus:border-transparent',
            isDragging &&
              !disabled && [
                'border-blue-600 dark:border-blue-400',
                'bg-blue-50 dark:bg-blue-950/30',
              ],
            !isDragging &&
              !disabled && [
                'border-gray-300 dark:border-gray-600',
                'hover:border-gray-400 dark:hover:border-gray-500',
              ],
            disabled && [
              'border-gray-200 dark:border-gray-700',
              'bg-gray-50 dark:bg-gray-900',
              'cursor-not-allowed opacity-60',
            ]
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
              disabled
                ? 'text-gray-300 dark:text-gray-700'
                : 'text-gray-400 dark:text-gray-500'
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
              disabled
                ? 'text-gray-400 dark:text-gray-600'
                : 'text-gray-600 dark:text-gray-300'
            )}
          >
            {label}
          </p>

          {/* File Info */}
          {(accept || maxSize) && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {accept && <span>Format: {accept}</span>}
              {accept && maxSize && <span> · </span>}
              {maxSize && <span>Max size: {formatBytes(maxSize)}</span>}
            </p>
          )}
        </div>

        {/* File List */}
        {showFileList && files.length > 0 && (
          <ul className="mt-4 space-y-2" aria-label="Uploaded files list">
            {files.map((uploadedFile) => (
              <li
                key={uploadedFile.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-md border',
                  uploadedFile.error
                    ? 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
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
                  <div className="h-12 w-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded">
                    <svg
                      className="h-6 w-6 text-gray-500 dark:text-gray-400"
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
                  <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatBytes(uploadedFile.file.size)}
                  </p>

                  {/* Progress Bar */}
                  {uploadedFile.progress !== undefined &&
                    uploadedFile.progress < 100 && (
                      <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${uploadedFile.progress}%` }}
                        />
                      </div>
                    )}

                  {/* Error Message */}
                  {uploadedFile.error && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {uploadedFile.error}
                    </p>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeFile(uploadedFile.id)}
                  className={cn(
                    'p-1 rounded-md',
                    'text-gray-400 dark:text-gray-500',
                    'hover:text-gray-600 dark:hover:text-gray-300',
                    'hover:bg-gray-200 dark:hover:bg-gray-700',
                    'focus:outline-none focus:ring-2',
                    'focus:ring-blue-600 dark:focus:ring-blue-400'
                  )}
                  aria-label={`Remove ${uploadedFile.file.name}`}
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
