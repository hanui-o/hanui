import { Container, Heading, Body, Button } from '@hanui/react';

export default function HeroSectionTemplate() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Example */}
      <section className="py-20 bg-krds-primary-5">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Heading level="h1" className="mb-4">
              공공서비스 플랫폼
            </Heading>
            <Body className="text-lg text-krds-gray-70 mb-8">
              국민을 위한 편리하고 안전한 디지털 서비스를 제공합니다
            </Body>
            <div className="flex gap-4 justify-center">
              <Button variant="primary" size="lg">
                서비스 시작하기
              </Button>
              <Button variant="outline" size="lg">
                자세히 보기
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Documentation Section */}
      <Container className="py-12">
        <Heading level="h2" className="mb-6">
          Hero Section 예시
        </Heading>

        <div className="space-y-6">
          <div>
            <Heading level="h3" className="mb-3">
              사용 컴포넌트
            </Heading>
            <ul className="list-disc list-inside space-y-2 text-krds-gray-70">
              <li>Container - 콘텐츠 최대 너비 제한</li>
              <li>Heading - 제목 (h1)</li>
              <li>Body - 본문 텍스트</li>
              <li>Button - 액션 버튼</li>
            </ul>
          </div>

          <div>
            <Heading level="h3" className="mb-3">
              코드 예시
            </Heading>
            <pre className="p-4 bg-krds-gray-5 rounded overflow-x-auto">
              <code className="text-sm">{`import { Container, Heading, Body, Button } from '@hanui/react';

export function HeroExample() {
  return (
    <section className="py-20 bg-krds-primary-5">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <Heading level="h1" className="mb-4">
            공공서비스 플랫폼
          </Heading>
          <Body className="text-lg text-krds-gray-70 mb-8">
            국민을 위한 편리하고 안전한 디지털 서비스를 제공합니다
          </Body>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="lg">
              서비스 시작하기
            </Button>
            <Button variant="outline" size="lg">
              자세히 보기
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}`}</code>
            </pre>
          </div>

          <div>
            <Heading level="h3" className="mb-3">
              사용 팁
            </Heading>
            <ul className="list-disc list-inside space-y-2 text-krds-gray-70">
              <li>
                <code className="px-2 py-1 bg-krds-gray-5 rounded">
                  bg-krds-primary-5
                </code>{' '}
                - KRDS 색상 변수를 사용한 배경색
              </li>
              <li>
                <code className="px-2 py-1 bg-krds-gray-5 rounded">
                  max-w-3xl mx-auto
                </code>{' '}
                - 중앙 정렬과 최대 너비 제한
              </li>
              <li>
                <code className="px-2 py-1 bg-krds-gray-5 rounded">
                  text-center
                </code>{' '}
                - 텍스트 중앙 정렬
              </li>
              <li>
                버튼 간격은{' '}
                <code className="px-2 py-1 bg-krds-gray-5 rounded">gap-4</code>
                로 일관성 유지
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
