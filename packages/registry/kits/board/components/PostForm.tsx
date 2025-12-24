// Board Kit - PostForm Component
// 게시글 작성/수정 폼 컴포넌트

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Button,
  Input,
  Textarea,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@hanui/react';
import { Save, ArrowLeft } from 'lucide-react';
import { useCreatePost, useUpdatePost, usePost } from '../hooks/usePosts';

const postSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요')
    .max(100, '제목은 100자 이내로 입력해주세요'),
  content: z
    .string()
    .min(1, '내용을 입력해주세요')
    .max(10000, '내용은 10000자 이내로 입력해주세요'),
  category: z.string().optional(),
  tags: z.string().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
  postId?: string;
  basePath?: string;
  categories?: string[];
}

export function PostForm({
  postId,
  basePath = '/posts',
  categories = [],
}: PostFormProps) {
  const router = useRouter();
  const isEdit = !!postId;

  const { data: existingPost, isLoading: postLoading } = usePost(postId || '');
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      category: '',
      tags: '',
    },
  });

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEdit && existingPost) {
      setValue('title', existingPost.title);
      setValue('content', existingPost.content);
      setValue('category', existingPost.category || '');
      setValue('tags', existingPost.tags?.join(', ') || '');
    }
  }, [isEdit, existingPost, setValue]);

  const onSubmit = async (data: PostFormData) => {
    const postData = {
      title: data.title,
      content: data.content,
      category: data.category || undefined,
      tags: data.tags
        ? data.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        : undefined,
    };

    if (isEdit && postId) {
      await updatePost.mutateAsync({ id: postId, data: postData });
      router.push(`${basePath}/${postId}`);
    } else {
      const newPost = await createPost.mutateAsync(postData);
      router.push(`${basePath}/${newPost.id}`);
    }
  };

  if (isEdit && postLoading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          뒤로가기
        </Button>
        <h1 className="text-2xl font-bold">
          {isEdit ? '게시글 수정' : '새 게시글 작성'}
        </h1>
        <div className="w-24" />
      </div>

      <div className="border border-krds-gray-20 rounded-lg p-6 space-y-6">
        {/* 제목 */}
        <div className="space-y-2">
          <Label htmlFor="title" required>
            제목
          </Label>
          <Input
            id="title"
            placeholder="제목을 입력하세요"
            {...register('title')}
            aria-invalid={!!errors.title}
          />
          {errors.title && (
            <p className="text-sm text-krds-danger-base">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* 카테고리 */}
        {categories.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="category">카테고리</Label>
            <Select
              value={watch('category')}
              onValueChange={(value) => setValue('category', value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">선택 안함</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* 태그 */}
        <div className="space-y-2">
          <Label htmlFor="tags">태그</Label>
          <Input
            id="tags"
            placeholder="태그를 쉼표(,)로 구분하여 입력하세요"
            {...register('tags')}
          />
          <p className="text-sm text-krds-gray-50">
            예: React, TypeScript, Next.js
          </p>
        </div>

        {/* 내용 */}
        <div className="space-y-2">
          <Label htmlFor="content" required>
            내용
          </Label>
          <Textarea
            id="content"
            placeholder="내용을 입력하세요"
            rows={15}
            {...register('content')}
            aria-invalid={!!errors.content}
          />
          {errors.content && (
            <p className="text-sm text-krds-danger-base">
              {errors.content.message}
            </p>
          )}
        </div>
      </div>

      {/* 제출 버튼 */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          취소
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          <Save className="w-4 h-4 mr-2" />
          {isEdit ? '수정하기' : '등록하기'}
        </Button>
      </div>
    </form>
  );
}
