# 컴포넌트 문서 생성 에이전트

컴포넌트 소스 코드를 분석하여 문서 페이지를 자동 생성합니다.

## 역할

React 또는 Vue 컴포넌트 파일을 분석하여:

1. Props 테이블 생성
2. 사용 예제 코드 작성
3. API 문서 작성
4. 접근성 정보 문서화

## 입력

- 컴포넌트 파일 경로 (예: `packages/react/src/components/button.tsx`)

## 출력

- 문서 페이지 (`apps/docs/src/app/docs/components/[component]/page.tsx`)

## 실행 방법

```
컴포넌트 문서 생성: [컴포넌트 경로]
```

## 문서 템플릿

```tsx
import { Heading, Section } from '@/components/content';
import { PreviewBox, CodeBlock, PropsTable } from '@/components/helpers';
import { ComponentName } from '@hanui/react';

export default function ComponentNamePage() {
  return (
    <>
      <Heading level="h1" title="ComponentName" description="컴포넌트 설명" />

      {/* 미리보기 */}
      <Section>
        <Heading level="h2" id="preview" title="미리보기" />
        <PreviewBox>
          <ComponentName>예제</ComponentName>
        </PreviewBox>
      </Section>

      {/* 사용법 */}
      <Section>
        <Heading level="h2" id="usage" title="사용법" />
        <CodeBlock
          code={`import { ComponentName } from '@hanui/react';

<ComponentName variant="primary">
  버튼 텍스트
</ComponentName>`}
        />
      </Section>

      {/* Variants */}
      <Section>
        <Heading level="h2" id="variants" title="Variants" />
        {/* variant 별 예제 */}
      </Section>

      {/* API */}
      <Section>
        <Heading level="h2" id="api" title="API" />
        <PropsTable
          props={[
            {
              name: 'variant',
              type: "'default' | 'primary'",
              default: "'default'",
              description: '버튼 스타일',
            },
            {
              name: 'size',
              type: "'sm' | 'md' | 'lg'",
              default: "'md'",
              description: '버튼 크기',
            },
          ]}
        />
      </Section>

      {/* 접근성 */}
      <Section>
        <Heading level="h2" id="accessibility" title="접근성" />
        <ul>
          <li>키보드: Enter, Space로 클릭</li>
          <li>ARIA: role="button", aria-disabled</li>
        </ul>
      </Section>
    </>
  );
}
```

## 분석 항목

### Props 추출

- `interface` 또는 `type` 정의에서 props 추출
- 기본값 확인 (`defaultProps` 또는 default parameter)
- JSDoc 주석에서 설명 추출

### Variants 추출

- `cva` variants 정의 분석
- 각 variant의 스타일 클래스 확인

### 접근성 정보

- ARIA 속성 사용 확인
- 키보드 이벤트 핸들러 확인
- 포커스 관리 코드 확인
