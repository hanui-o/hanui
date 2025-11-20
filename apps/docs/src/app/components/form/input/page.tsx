'use client';

import {
  Input as InputComponent,
  Section,
  SectionHeading,
  Subsection,
  Body,
  Stack,
  Card,
  Code,
  List,
  ListItem,
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
  PageNavigation,
  DoCard,
  DontCard,
} from '@/components/hanui';

// Example icons
const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.7419 10.3419C12.7095 9.13119 13.25 7.62 13.25 6C13.25 2.54822 10.4518 -0.25 7 -0.25C3.54822 -0.25 0.75 2.54822 0.75 6C0.75 9.45178 3.54822 12.25 7 12.25C8.62 12.25 10.1312 11.7095 11.3419 10.7419L14.2929 13.6929C14.6834 14.0834 15.3166 14.0834 15.7071 13.6929C16.0976 13.3024 16.0976 12.6692 15.7071 12.2787L12.7561 9.32787C12.4306 9.65342 12.0819 9.95516 11.7419 10.3419ZM7 10.75C4.37665 10.75 2.25 8.62335 2.25 6C2.25 3.37665 4.37665 1.25 7 1.25C9.62335 1.25 11.75 3.37665 11.75 6C11.75 8.62335 9.62335 10.75 7 10.75Z"
      fill="currentColor"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 3C1.67157 3 1 3.67157 1 4.5V11.5C1 12.3284 1.67157 13 2.5 13H13.5C14.3284 13 15 12.3284 15 11.5V4.5C15 3.67157 14.3284 3 13.5 3H2.5ZM2.5 4.5H13.5L8 8.5L2.5 4.5ZM2.5 6.20711L8 10.2071L13.5 6.20711V11.5H2.5V6.20711Z"
      fill="currentColor"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.4697 4.46967C13.7626 4.17678 14.2374 4.17678 14.5303 4.46967C14.8232 4.76256 14.8232 5.23744 14.5303 5.53033L6.53033 13.5303C6.23744 13.8232 5.76256 13.8232 5.46967 13.5303L1.46967 9.53033C1.17678 9.23744 1.17678 8.76256 1.46967 8.46967C1.76256 8.17678 2.23744 8.17678 2.53033 8.46967L6 11.9393L13.4697 4.46967Z"
      fill="currentColor"
    />
  </svg>
);

export default function InputPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Input"
        description="다양한 스타일과 크기를 지원하는 입력 필드 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section level="h2">
            <SectionHeading level="h2" id="installation" title="설치">
              <Body className="leading-relaxed">
                다음 명령어로 Input 컴포넌트를 설치합니다:
              </Body>
            </SectionHeading>
            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add input
            </Code>
          </Section>

          {/* What is it */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Input은 사용자로부터 정보를 받는 가장 기본적인 인터랙션 요소입니다. KRDS(한국형 웹 콘텐츠 접근성 지침)를 준수하여 레이블 연결, 에러 처리, 키보드 네비게이션 등 웹 접근성을 보장합니다."
            />
            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>Props-based API:</strong> size와 variant prop으로
                  일관된 스타일을 적용합니다.
                </ListItem>
                <ListItem>
                  <strong>Error State:</strong> error prop과 aria-invalid로 에러
                  상태를 표시합니다.
                </ListItem>
                <ListItem>
                  <strong>Addon Support:</strong> leftAddon과 rightAddon으로
                  아이콘을 추가할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>HTML5 Types:</strong> email, tel, number 등 다양한
                  input type을 지원합니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section level="h2">
            <SectionHeading level="h2" id="preview" title="미리보기" />
            <Card>
              <Stack gap="md" className="max-w-md">
                <InputComponent placeholder="기본 입력 필드" />
                <InputComponent
                  leftAddon={<SearchIcon />}
                  placeholder="검색어 입력"
                />
              </Stack>
            </Card>
            <Code variant="block" language="tsx">
              {`<Input placeholder="기본 입력 필드" />
<Input leftAddon={<SearchIcon />} placeholder="검색어 입력" />`}
            </Code>
          </Section>

          {/* Usage */}
          <Section level="h2">
            <SectionHeading level="h2" id="usage" title="사용 방법" />

            {/* Sizes */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="sizes"
                title="크기 (Size)"
                description="입력 필드 크기는 예상 입력 길이와 일치시킵니다. Small은 우편번호 등 짧은 입력, Large는 제목이나 주소 등 긴 입력에 적합합니다."
              />
              <Card>
                <Stack gap="md" className="max-w-md">
                  <InputComponent size="sm" placeholder="Small (32px)" />
                  <InputComponent size="md" placeholder="Medium (40px)" />
                  <InputComponent size="lg" placeholder="Large (48px)" />
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<Input size="sm" placeholder="Small (32px)" />
<Input size="md" placeholder="Medium (40px)" />
<Input size="lg" placeholder="Large (48px)" />`}
              </Code>
            </Subsection>

            {/* Variants */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="variants"
                title="변형 (Variant)"
                description="Default는 일반적인 경우, Filled는 배경이 있는 디자인에 적합합니다."
              />
              <Card>
                <Stack gap="md" className="max-w-md">
                  <InputComponent
                    variant="default"
                    placeholder="Default (테두리)"
                  />
                  <InputComponent
                    variant="filled"
                    placeholder="Filled (배경)"
                  />
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<Input variant="default" placeholder="Default (테두리)" />
<Input variant="filled" placeholder="Filled (배경)" />`}
              </Code>
            </Subsection>

            {/* With Icons */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="with-icons"
                title="아이콘 추가"
                description="leftAddon과 rightAddon으로 입력 필드의 용도를 시각적으로 명확히 할 수 있습니다."
              />
              <Card>
                <Stack gap="md" className="max-w-md">
                  <InputComponent
                    leftAddon={<SearchIcon />}
                    placeholder="검색어를 입력하세요"
                  />
                  <InputComponent
                    leftAddon={<EmailIcon />}
                    type="email"
                    placeholder="example@email.com"
                  />
                  <InputComponent
                    rightAddon={<CheckIcon />}
                    placeholder="확인 완료"
                  />
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<Input
  leftAddon={<SearchIcon />}
  placeholder="검색어를 입력하세요"
/>
<Input
  leftAddon={<EmailIcon />}
  type="email"
  placeholder="example@email.com"
/>
<Input
  rightAddon={<CheckIcon />}
  placeholder="확인 완료"
/>`}
              </Code>
            </Subsection>

            {/* Error State */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="error-state"
                title="에러 상태"
                description="입력값이 유효하지 않을 때 error prop으로 즉각적인 피드백을 제공합니다."
              />
              <Card>
                <Stack gap="md" className="max-w-md">
                  <div>
                    <InputComponent
                      error
                      type="email"
                      defaultValue="invalid@"
                    />
                    <Body size="sm" className="mt-1 text-krds-danger-text">
                      이메일 형식이 올바르지 않습니다. &apos;@&apos;를
                      포함해주세요.
                    </Body>
                  </div>
                  <div>
                    <InputComponent
                      error
                      leftAddon={<EmailIcon />}
                      placeholder="example@email.com"
                    />
                    <Body size="sm" className="mt-1 text-krds-danger-text">
                      필수 입력 항목입니다.
                    </Body>
                  </div>
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<Input error type="email" defaultValue="invalid@" />
<p className="mt-1 text-krds-danger-text">
  이메일 형식이 올바르지 않습니다. '@'를 포함해주세요.
</p>`}
              </Code>
            </Subsection>

            {/* Types */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="types"
                title="Input Types"
                description="각 데이터 타입에 맞는 type을 사용하면 모바일에서 적절한 키보드가 표시되고, 브라우저의 자동 검증 기능을 활용할 수 있습니다."
              />
              <Card>
                <Stack gap="sm" className="max-w-md">
                  <InputComponent type="text" placeholder="텍스트" />
                  <InputComponent type="email" placeholder="이메일" />
                  <InputComponent type="password" placeholder="비밀번호" />
                  <InputComponent type="number" placeholder="숫자" />
                  <InputComponent type="tel" placeholder="전화번호" />
                  <InputComponent type="url" placeholder="URL" />
                  <InputComponent type="date" />
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<Input type="text" placeholder="텍스트" />
<Input type="email" placeholder="이메일" />
<Input type="password" placeholder="비밀번호" />
<Input type="number" placeholder="숫자" />
<Input type="tel" placeholder="전화번호" />
<Input type="url" placeholder="URL" />
<Input type="date" />`}
              </Code>
            </Subsection>

            {/* Disabled */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="disabled"
                title="비활성화"
                description="특정 조건이 충족되지 않아 입력을 받을 수 없을 때 사용합니다."
              />
              <Card>
                <Stack gap="md" className="max-w-md">
                  <InputComponent disabled placeholder="비활성화된 입력 필드" />
                  <InputComponent
                    disabled
                    variant="filled"
                    placeholder="비활성화된 Filled"
                  />
                </Stack>
              </Card>
              <Code variant="block" language="tsx">
                {`<Input disabled placeholder="비활성화된 입력 필드" />
<Input disabled variant="filled" placeholder="비활성화된 Filled" />`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section level="h2">
            <SectionHeading level="h2" id="best-practices" title="모범 사례" />
            <Stack gap="md">
              <DoCard title="Input을 사용하기 적합한 경우">
                <List variant="check">
                  <ListItem>
                    이름, 주소, 이메일 등 자유 형식의 텍스트 수집
                  </ListItem>
                  <ListItem>검색어를 입력받을 때</ListItem>
                  <ListItem>비밀번호, 전화번호 등 특수 형식의 데이터</ListItem>
                  <ListItem>숫자나 날짜 등 구조화된 데이터 입력</ListItem>
                </List>
              </DoCard>

              <Card variant="warning">
                <SectionHeading level="h3" id="caution" title="주의사항" />
                <List variant="check" className="text-krds-gray-90">
                  <ListItem>
                    <strong>레이블 필수:</strong> 모든 입력 필드에는 명확한
                    레이블이 필요합니다.
                  </ListItem>
                  <ListItem>
                    <strong>플레이스홀더 제한:</strong> 플레이스홀더만으로
                    레이블을 대체하지 마세요.
                  </ListItem>
                  <ListItem>
                    <strong>적절한 Type:</strong> email, tel, number 등을
                    사용하여 모바일 최적화된 키보드를 제공하세요.
                  </ListItem>
                  <ListItem>
                    <strong>명확한 에러 메시지:</strong> &quot;잘못된
                    입력&quot;이 아닌 구체적인 해결 방법을 제시하세요.
                  </ListItem>
                </List>
              </Card>

              <DontCard title="Input을 사용하지 말아야 하는 경우">
                <List variant="cross">
                  <ListItem>
                    선택지가 5개 이하로 제한적인 경우 (Radio 사용)
                  </ListItem>
                  <ListItem>
                    여러 옵션 중 선택하는 경우 (Select 또는 Checkbox 사용)
                  </ListItem>
                  <ListItem>
                    Yes/No 이진 선택인 경우 (Checkbox 또는 Toggle 사용)
                  </ListItem>
                </List>
              </DontCard>
            </Stack>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Input은 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>레이블 연결:</strong> htmlFor와 id로 레이블과 입력
                  필드를 연결합니다.
                </ListItem>
                <ListItem>
                  <strong>에러 상태:</strong> error prop이 aria-invalid를
                  자동으로 설정합니다.
                </ListItem>
                <ListItem>
                  <strong>에러 메시지:</strong> aria-describedby로 에러 메시지를
                  연결하세요.
                </ListItem>
                <ListItem>
                  <strong>키보드 네비게이션:</strong> Tab, Enter 키로 탐색할 수
                  있습니다.
                </ListItem>
                <ListItem>
                  <strong>Focus Indicator:</strong> focus-visible로 포커스 링이
                  표시됩니다.
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="api-reference"
              title="API 레퍼런스"
            />

            {/* Props */}
            <Subsection level="h3">
              <SectionHeading level="h3" id="props" title="Props" />
              <Table>
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
                      <Code>type</Code>
                    </TableCell>
                    <TableCell>
                      <Code>
                        &quot;text&quot; | &quot;email&quot; |
                        &quot;password&quot; | &quot;number&quot; |
                        &quot;tel&quot; | &quot;url&quot; | &quot;date&quot;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;text&quot;</Code>
                    </TableCell>
                    <TableCell>입력 필드 타입</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code>
                        &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;md&quot;</Code>
                    </TableCell>
                    <TableCell>입력 필드 크기 (32px / 40px / 48px)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;default&quot; | &quot;filled&quot;</Code>
                    </TableCell>
                    <TableCell>
                      <Code>&quot;default&quot;</Code>
                    </TableCell>
                    <TableCell>입력 필드 스타일</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>error</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>false</Code>
                    </TableCell>
                    <TableCell>에러 상태 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code>boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code>false</Code>
                    </TableCell>
                    <TableCell>비활성화 상태</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>leftAddon</Code>
                    </TableCell>
                    <TableCell>
                      <Code>ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>왼쪽에 표시할 아이콘/요소</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>rightAddon</Code>
                    </TableCell>
                    <TableCell>
                      <Code>ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>오른쪽에 표시할 아이콘/요소</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>placeholder</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>플레이스홀더 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code>string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스 (layout only)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* Size Variants */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="size-variants"
                title="Size Variants"
              />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>Height</TableHead>
                    <TableHead>Font Size</TableHead>
                    <TableHead>Padding</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>sm</Code>
                    </TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>15px (body-sm)</TableCell>
                    <TableCell>16px (horizontal)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>md</Code>
                    </TableCell>
                    <TableCell>40px</TableCell>
                    <TableCell>17px (body-md)</TableCell>
                    <TableCell>16px (horizontal)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>lg</Code>
                    </TableCell>
                    <TableCell>48px</TableCell>
                    <TableCell>19px (body-lg)</TableCell>
                    <TableCell>16px (horizontal)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* KRDS Compliance */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="krds-compliance"
                title="KRDS 준수사항"
              />
              <Card variant="info">
                <List variant="check" className="text-krds-gray-90">
                  <ListItem>
                    KRDS 타이포그래피 (body-sm, body-md, body-lg) 사용
                  </ListItem>
                  <ListItem>150% 줄 간격으로 가독성 확보</ListItem>
                  <ListItem>Focus indicator로 키보드 네비게이션 지원</ListItem>
                  <ListItem>에러 상태 자동 aria-invalid 설정</ListItem>
                  <ListItem>Disabled 상태 60% 투명도로 명확히 구분</ListItem>
                </List>
              </Card>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Spacing', href: '/components/spacing' }}
        next={{ title: 'Label', href: '/components/form/label' }}
      />
    </>
  );
}
