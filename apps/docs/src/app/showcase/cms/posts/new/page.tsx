'use client';

import * as React from 'react';
import {
  Breadcrumb,
  Button,
  Body,
  PublishSettings,
  RichTextEditorPlaceholder,
  type PublishSettingsState,
} from '@hanui/react';
import { ArrowLeft, Save, Clock } from 'lucide-react';
import Link from 'next/link';

export default function CmsPostNewPage() {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [lastSaved, setLastSaved] = React.useState<string | null>(null);

  const handlePublish = (settings: PublishSettingsState) => {
    alert(
      `발행: "${title}"\n상태: ${settings.status}\n카테고리: ${settings.category}\n태그: ${settings.tags.join(', ')}`
    );
  };

  const handleSaveDraft = () => {
    const now = new Date();
    setLastSaved(
      `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    );
  };

  return (
    <div className="space-y-4">
      {/* 브레드크럼 */}
      <Breadcrumb
        items={[
          { label: 'CMS', href: '/showcase/cms' },
          { label: '게시물 관리', href: '/showcase/cms/posts' },
          { label: '새 게시물' },
        ]}
      />

      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/showcase/cms/posts">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-krds-gray-90">
            새 게시물 작성
          </h1>
        </div>
        {lastSaved && (
          <div className="flex items-center gap-1.5 text-krds-gray-40">
            <Clock className="h-3.5 w-3.5" />
            <Body size="xs">마지막 저장: {lastSaved}</Body>
          </div>
        )}
      </div>

      {/* 본문 + 사이드바 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
        {/* 메인 콘텐츠 */}
        <div className="space-y-4">
          {/* 제목 입력 */}
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-b border-krds-gray-20 bg-transparent pb-3 text-2xl font-bold text-krds-gray-90 placeholder:text-krds-gray-30 focus:border-krds-primary-base focus:outline-none"
          />

          {/* 에디터 */}
          <RichTextEditorPlaceholder
            value={content}
            onChange={setContent}
            placeholder="내용을 입력하세요..."
            minHeight="500px"
          />

          {/* 첨부파일 */}
          <div className="rounded-lg border-2 border-dashed border-krds-gray-20 p-8 text-center transition-colors hover:border-krds-primary-base/30 hover:bg-krds-primary-5/20">
            <div className="flex flex-col items-center gap-2">
              <Save className="h-8 w-8 text-krds-gray-30" />
              <Body size="sm" className="text-krds-gray-50">
                파일을 드래그하거나 클릭하여 첨부하세요
              </Body>
              <Body size="xs" className="text-krds-gray-40">
                PDF, HWP, DOC, XLS, JPG, PNG (최대 50MB)
              </Body>
            </div>
          </div>
        </div>

        {/* 사이드바 */}
        <div className="space-y-4">
          <PublishSettings
            onPublish={handlePublish}
            onSaveDraft={handleSaveDraft}
          />
        </div>
      </div>
    </div>
  );
}
