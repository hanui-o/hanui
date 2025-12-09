'use client';

import * as React from 'react';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components
import {
  Tag,
  SelectableTag,
  RemovableTag,
  TagGroup,
  Code,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  List,
  ListItem,
} from '@hanui/react';
import { Star, TrendingUp, Zap } from 'lucide-react';

export default function TagPage() {
  const [selectedTags, setSelectedTags] = React.useState<string[]>(['react']);
  const [filterTags, setFilterTags] = React.useState<string[]>([
    '서울',
    '부산',
    '대전',
  ]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const removeFilterTag = (tag: string) => {
    setFilterTags((prev) => prev.filter((t) => t !== tag));
  };

  const clearAllFilters = () => {
    setFilterTags([]);
  };

  return (
    <>
      <Heading
        level="h1"
        title="Tag"
        description="키워드 또는 레이블을 사용하여 콘텐츠를 분류하는 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          {/* 1. 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              description="Tag는 콘텐츠 항목에 분류 체계, 데이터 속성을 표시하거나 필터링/정렬 옵션을 관리하는 데 사용됩니다. Tag, SelectableTag, RemovableTag, TagGroup 네 가지 컴포넌트를 제공합니다."
              className="sr-only"
            />
            <ComponentPreview>
              <div className="flex flex-wrap gap-2">
                <Tag>기본 태그</Tag>
                <Tag variant="primary">Primary</Tag>
                <Tag variant="success">성공</Tag>
                <Tag variant="warning">경고</Tag>
                <Tag variant="error">오류</Tag>
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx" showLineNumbers={false}>
              {`<Tag>기본 태그</Tag>
<Tag variant="primary">Primary</Tag>
<Tag variant="success">성공</Tag>
<Tag variant="warning">경고</Tag>
<Tag variant="error">오류</Tag>`}
            </Code>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="tag" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="Tag, SelectableTag, RemovableTag, TagGroup을 import하여 사용합니다."
            />
            <Code variant="block" language="tsx" showLineNumbers={false}>
              {`import { Tag, SelectableTag, RemovableTag, TagGroup } from '@hanui/react';

// 정보 표시용 기본 태그
<Tag variant="primary">카테고리</Tag>

// 선택 가능한 태그
<SelectableTag selected={isSelected} onChange={setIsSelected}>
  선택
</SelectableTag>

// 삭제 가능한 태그
<RemovableTag onRemove={handleRemove}>
  필터
</RemovableTag>`}
            </Code>
          </Section>

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* 기본 태그 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="기본 태그"
                description="정보 표시용 비대화형 태그입니다. 콘텐츠의 분류나 속성을 나타냅니다."
              />
              <ComponentPreview>
                <div className="flex flex-wrap gap-2">
                  <Tag>기본</Tag>
                  <Tag variant="primary">Primary</Tag>
                  <Tag variant="secondary">Secondary</Tag>
                  <Tag variant="success">Success</Tag>
                  <Tag variant="warning">Warning</Tag>
                  <Tag variant="error">Error</Tag>
                  <Tag variant="info">Info</Tag>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Tag>기본</Tag>
<Tag variant="primary">Primary</Tag>
<Tag variant="secondary">Secondary</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="warning">Warning</Tag>
<Tag variant="error">Error</Tag>
<Tag variant="info">Info</Tag>`}
              </Code>
            </Subsection>

            {/* 아웃라인 스타일 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="아웃라인 스타일"
                description="테두리만 있는 태그 스타일입니다."
              />
              <ComponentPreview>
                <div className="flex flex-wrap gap-2">
                  <Tag variant="outline-default">기본</Tag>
                  <Tag variant="outline-primary">Primary</Tag>
                  <Tag variant="outline-success">Success</Tag>
                  <Tag variant="outline-warning">Warning</Tag>
                  <Tag variant="outline-error">Error</Tag>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Tag variant="outline-default">기본</Tag>
<Tag variant="outline-primary">Primary</Tag>
<Tag variant="outline-success">Success</Tag>
<Tag variant="outline-warning">Warning</Tag>
<Tag variant="outline-error">Error</Tag>`}
              </Code>
            </Subsection>

            {/* 크기 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="크기"
                description="sm, md, lg 세 가지 크기를 지원합니다."
              />
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-2">
                  <Tag size="sm" variant="primary">
                    Small
                  </Tag>
                  <Tag size="md" variant="primary">
                    Medium
                  </Tag>
                  <Tag size="lg" variant="primary">
                    Large
                  </Tag>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Tag size="sm" variant="primary">Small</Tag>
<Tag size="md" variant="primary">Medium</Tag>
<Tag size="lg" variant="primary">Large</Tag>`}
              </Code>
            </Subsection>

            {/* 아이콘 태그 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="아이콘 태그"
                description="icon prop으로 아이콘을 추가할 수 있습니다."
              />
              <ComponentPreview>
                <div className="flex flex-wrap gap-2">
                  <Tag
                    variant="primary"
                    icon={<Star className="w-3.5 h-3.5" />}
                  >
                    인기
                  </Tag>
                  <Tag
                    variant="success"
                    icon={<TrendingUp className="w-3.5 h-3.5" />}
                  >
                    상승
                  </Tag>
                  <Tag variant="warning" icon={<Zap className="w-3.5 h-3.5" />}>
                    빠른배송
                  </Tag>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { Star, TrendingUp, Zap } from 'lucide-react';

<Tag variant="primary" icon={<Star className="w-3.5 h-3.5" />}>
  인기
</Tag>
<Tag variant="success" icon={<TrendingUp className="w-3.5 h-3.5" />}>
  상승
</Tag>
<Tag variant="warning" icon={<Zap className="w-3.5 h-3.5" />}>
  빠른배송
</Tag>`}
              </Code>
            </Subsection>

            {/* 선택 가능한 태그 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="선택 가능한 태그 (SelectableTag)"
                description="필터링 옵션으로 사용되는 선택 가능한 태그입니다. 선택 시 체크 아이콘이 표시됩니다."
              />
              <ComponentPreview>
                <div className="flex flex-wrap gap-2">
                  <SelectableTag
                    selected={selectedTags.includes('react')}
                    onChange={() => toggleTag('react')}
                  >
                    React
                  </SelectableTag>
                  <SelectableTag
                    selected={selectedTags.includes('vue')}
                    onChange={() => toggleTag('vue')}
                  >
                    Vue
                  </SelectableTag>
                  <SelectableTag
                    selected={selectedTags.includes('angular')}
                    onChange={() => toggleTag('angular')}
                  >
                    Angular
                  </SelectableTag>
                  <SelectableTag
                    selected={selectedTags.includes('svelte')}
                    onChange={() => toggleTag('svelte')}
                  >
                    Svelte
                  </SelectableTag>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`const [selectedTags, setSelectedTags] = useState(['react']);

const toggleTag = (tag: string) => {
  setSelectedTags(prev =>
    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
  );
};

<SelectableTag
  selected={selectedTags.includes('react')}
  onChange={() => toggleTag('react')}
>
  React
</SelectableTag>`}
              </Code>
            </Subsection>

            {/* 삭제 가능한 태그 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="삭제 가능한 태그 (RemovableTag)"
                description="삭제 버튼이 있는 태그입니다. 필터링 옵션에서 선택된 조건을 삭제할 때 사용합니다."
              />
              <ComponentPreview>
                <div className="flex flex-wrap gap-2">
                  <RemovableTag onRemove={() => console.log('삭제: 서울')}>
                    서울
                  </RemovableTag>
                  <RemovableTag
                    variant="outline-primary"
                    onRemove={() => console.log('삭제: 부산')}
                  >
                    부산
                  </RemovableTag>
                  <RemovableTag
                    variant="primary"
                    onRemove={() => console.log('삭제: 대전')}
                  >
                    대전
                  </RemovableTag>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<RemovableTag onRemove={() => handleRemove('서울')}>
  서울
</RemovableTag>
<RemovableTag variant="outline-primary" onRemove={() => handleRemove('부산')}>
  부산
</RemovableTag>
<RemovableTag variant="primary" onRemove={() => handleRemove('대전')}>
  대전
</RemovableTag>`}
              </Code>
            </Subsection>

            {/* 태그 그룹 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="태그 그룹 (TagGroup)"
                description="여러 태그를 그룹화하고 전체 삭제 기능을 제공합니다."
              />
              <ComponentPreview>
                <TagGroup
                  showClearAll={filterTags.length > 0}
                  onClearAll={clearAllFilters}
                >
                  {filterTags.map((tag) => (
                    <RemovableTag
                      key={tag}
                      variant="outline-default"
                      onRemove={() => removeFilterTag(tag)}
                    >
                      {tag}
                    </RemovableTag>
                  ))}
                </TagGroup>
                {filterTags.length === 0 && (
                  <p className="text-sm text-krds-gray-50 mt-2">
                    선택된 필터가 없습니다.
                  </p>
                )}
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`const [filterTags, setFilterTags] = useState(['서울', '부산', '대전']);

const removeFilterTag = (tag: string) => {
  setFilterTags(prev => prev.filter(t => t !== tag));
};

const clearAllFilters = () => {
  setFilterTags([]);
};

<TagGroup
  showClearAll={filterTags.length > 0}
  onClearAll={clearAllFilters}
>
  {filterTags.map(tag => (
    <RemovableTag
      key={tag}
      variant="outline-default"
      onRemove={() => removeFilterTag(tag)}
    >
      {tag}
    </RemovableTag>
  ))}
</TagGroup>`}
              </Code>
            </Subsection>
          </Section>

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Tag는 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>SelectableTag:</strong> role=&quot;checkbox&quot;와
                aria-checked 속성으로 선택 상태를 스크린리더에 전달합니다.
              </ListItem>
              <ListItem>
                <strong>RemovableTag:</strong> 삭제 버튼에 aria-label로 명확한
                레이블을 제공합니다.
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> Tab으로 포커스 이동, Enter
                또는 Space로 선택/삭제가 가능합니다.
              </ListItem>
              <ListItem>
                <strong>포커스 표시:</strong> 대화형 태그에 명확한 포커스 링이
                표시됩니다.
              </ListItem>
              <ListItem>
                명도 대비 4.5:1 이상을 준수하여 시각적 접근성을 보장합니다.
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Tag Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;default&apos; | &apos;primary&apos; |
                        &apos;secondary&apos; | &apos;success&apos; |
                        &apos;warning&apos; | &apos;error&apos; |
                        &apos;info&apos; | &apos;outline-*&apos;
                      </Code>
                    </TableCell>
                    <TableCell>&apos;default&apos;</TableCell>
                    <TableCell>태그 스타일</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;
                      </Code>
                    </TableCell>
                    <TableCell>&apos;md&apos;</TableCell>
                    <TableCell>태그 크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>icon</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">React.ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>아이콘 (왼쪽)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="SelectableTag Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>selected</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>선택 상태</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (selected: boolean) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>선택 상태 변경 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showCheckIcon</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>체크 아이콘 표시 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">TagVariant</Code>
                    </TableCell>
                    <TableCell>&apos;outline-default&apos;</TableCell>
                    <TableCell>태그 스타일</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;
                      </Code>
                    </TableCell>
                    <TableCell>&apos;md&apos;</TableCell>
                    <TableCell>태그 크기</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="RemovableTag Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>onRemove</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">() =&gt; void</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>삭제 버튼 클릭 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>removeLabel</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>&apos;삭제&apos;</TableCell>
                    <TableCell>삭제 버튼 aria-label</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">TagVariant</Code>
                    </TableCell>
                    <TableCell>&apos;outline-default&apos;</TableCell>
                    <TableCell>태그 스타일</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;
                      </Code>
                    </TableCell>
                    <TableCell>&apos;md&apos;</TableCell>
                    <TableCell>태그 크기</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="TagGroup Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>showClearAll</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>전체 삭제 버튼 표시 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>clearAllText</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>&apos;전체 삭제&apos;</TableCell>
                    <TableCell>전체 삭제 버튼 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onClearAll</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">() =&gt; void</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>전체 삭제 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>spacing</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;
                      </Code>
                    </TableCell>
                    <TableCell>&apos;md&apos;</TableCell>
                    <TableCell>태그 간격</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Table', href: '/components/table' }}
        next={{ title: 'Textarea', href: '/components/textarea' }}
      />
    </>
  );
}
