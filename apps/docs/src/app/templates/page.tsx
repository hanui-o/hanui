import { Container, Heading, Card, Link, Body } from '@hanui/react';

interface TemplateCardProps {
  title: string;
  description: string;
  href: string;
  tags: string[];
}

function TemplateCard({ title, description, href, tags }: TemplateCardProps) {
  return (
    <Link href={href} className="no-underline">
      <Card className="p-6 h-full hover:shadow-lg transition-shadow">
        <Heading level="h3" className="mb-2">
          {title}
        </Heading>
        <Body className="text-krds-gray-70 mb-4">{description}</Body>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-krds-primary-5 text-krds-primary-60 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </Card>
    </Link>
  );
}

export default function TemplatesPage() {
  return (
    <Container className="py-12">
      <Heading level="h1" className="mb-4">
        템플릿
      </Heading>
      <Body className="text-krds-gray-70 mb-8">
        HANUI 컴포넌트 조합 예시 - 복붙해서 사용하세요
      </Body>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <TemplateCard
          title="Hero Section"
          description="랜딩 페이지 히어로 섹션"
          href="/templates/hero-section"
          tags={['Container', 'Heading', 'Button']}
        />
        <TemplateCard
          title="List + Table"
          description="검색 + 테이블 + 페이지네이션"
          href="/templates/list-table"
          tags={['Table', 'Pagination', 'Search']}
        />
        <TemplateCard
          title="Form Layout"
          description="신청 폼 레이아웃"
          href="/templates/form-layout"
          tags={['Input', 'Select', 'FileUpload']}
        />
      </div>
    </Container>
  );
}
