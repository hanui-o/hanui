'use client';

import { useState } from 'react';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
  Switch,
  Button,
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
  FormField,
  FormLabel,
  FormHelperText,
  FormError,
  Body,
} from '@hanui/react';

export default function SwitchPage() {
  const [basicChecked, setBasicChecked] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <>
      <Heading
        level="h1"
        title="Switch"
        description="즉시 적용되는 켜기/끄기 상태 전환에 사용되는 토글 컴포넌트입니다. FormField와 통합되어 폼 검증 및 접근성을 제공합니다."
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
              description="Switch는 즉시 적용되는 설정 변경에 사용됩니다. Radix UI 기반으로 접근성이 보장되며, FormField와 통합하여 폼 검증을 지원합니다."
              className="sr-only"
            />
            <ComponentPreview>
              <div className="flex items-center gap-4">
                <Switch
                  checked={basicChecked}
                  onCheckedChange={setBasicChecked}
                  id="overview-switch"
                  label="알림 받기"
                />
                <span className="text-sm text-krds-gray-60">
                  상태: {basicChecked ? '켜짐' : '꺼짐'}
                </span>
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`import { Switch } from '@hanui/react';

const [checked, setChecked] = useState(false);

<Switch
  checked={checked}
  onCheckedChange={setChecked}
  label="알림 받기"
/>`}
            </Code>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="switch" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="Switch 컴포넌트를 import하고 checked, onCheckedChange로 상태를 관리합니다."
            />
            <Code variant="block" language="tsx">
              {`import { Switch } from '@hanui/react';

<Switch
  checked={checked}
  onCheckedChange={setChecked}
  id="my-switch"
  label="알림 받기"
/>`}
            </Code>
          </Section>

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* 라벨 포함 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="라벨 포함"
                description="label prop으로 라벨을 추가하고, labelPosition으로 위치를 조정할 수 있습니다."
              />
              <ComponentPreview>
                <div className="space-y-4">
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                    id="notifications"
                    label="알림 받기"
                    labelPosition="right"
                  />
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    id="darkMode"
                    label="다크 모드"
                    labelPosition="left"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`{/* 라벨이 오른쪽 (기본값) */}
<Switch label="알림 받기" labelPosition="right" />

{/* 라벨이 왼쪽 */}
<Switch label="다크 모드" labelPosition="left" />`}
              </Code>
            </Subsection>

            {/* 크기 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="크기"
                description="sm, md(기본값), lg 세 가지 크기를 제공합니다."
              />
              <ComponentPreview>
                <div className="space-y-4">
                  <Switch size="sm" label="Small" id="size-sm" defaultChecked />
                  <Switch
                    size="md"
                    label="Medium (기본값)"
                    id="size-md"
                    defaultChecked
                  />
                  <Switch size="lg" label="Large" id="size-lg" defaultChecked />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Switch size="sm" label="Small" />
<Switch size="md" label="Medium (기본값)" />
<Switch size="lg" label="Large" />`}
              </Code>
            </Subsection>

            {/* 비활성화 상태 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="비활성화 상태"
                description="disabled prop으로 스위치를 비활성화할 수 있습니다."
              />
              <ComponentPreview>
                <div className="space-y-4">
                  <Switch disabled label="비활성화 (꺼짐)" id="disabled-off" />
                  <Switch
                    disabled
                    defaultChecked
                    label="비활성화 (켜짐)"
                    id="disabled-on"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Switch disabled label="비활성화 (꺼짐)" />
<Switch disabled defaultChecked label="비활성화 (켜짐)" />`}
              </Code>
            </Subsection>

            {/* 에러 상태 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="에러 상태"
                description="status='error' prop으로 에러 상태를 표시할 수 있습니다."
              />
              <ComponentPreview>
                <Switch
                  status="error"
                  label="에러 상태"
                  id="error-switch"
                  defaultChecked
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Switch status="error" label="에러 상태" defaultChecked />`}
              </Code>
            </Subsection>

            {/* FormField 통합 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="FormField 통합"
                description="FormField와 함께 사용하면 자동으로 접근성 속성이 연결되며 폼 검증을 쉽게 구현할 수 있습니다."
              />
              <ComponentPreview>
                <div className="space-y-6 w-full max-w-md">
                  <FormField id="auto-save">
                    <div className="flex items-center justify-between">
                      <div>
                        <FormLabel>자동 저장</FormLabel>
                        <FormHelperText>
                          변경사항을 자동으로 저장합니다
                        </FormHelperText>
                      </div>
                      <Switch
                        checked={autoSave}
                        onCheckedChange={setAutoSave}
                      />
                    </div>
                  </FormField>

                  <FormField id="marketing" status="error">
                    <div className="flex items-center justify-between">
                      <div>
                        <FormLabel>마케팅 정보 수신</FormLabel>
                        <FormError>필수 동의 항목입니다</FormError>
                      </div>
                      <Switch
                        checked={marketing}
                        onCheckedChange={setMarketing}
                      />
                    </div>
                  </FormField>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<FormField id="auto-save">
  <div className="flex items-center justify-between">
    <div>
      <FormLabel>자동 저장</FormLabel>
      <FormHelperText>변경사항을 자동으로 저장합니다</FormHelperText>
    </div>
    <Switch checked={autoSave} onCheckedChange={setAutoSave} />
  </div>
</FormField>

<FormField id="marketing" status="error">
  <div className="flex items-center justify-between">
    <div>
      <FormLabel>마케팅 정보 수신</FormLabel>
      <FormError>필수 동의 항목입니다</FormError>
    </div>
    <Switch checked={marketing} onCheckedChange={setMarketing} />
  </div>
</FormField>`}
              </Code>
            </Subsection>

            {/* 설정 패널 예제 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="설정 패널 예제"
                description="실제 설정 화면에서 사용되는 패턴입니다."
              />
              <ComponentPreview>
                <div className="w-full max-w-md space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-krds-gray-20">
                    <div>
                      <Body size="md" weight="semibold">
                        푸시 알림
                      </Body>
                      <Body size="sm" className="text-krds-gray-60">
                        새로운 소식을 푸시 알림으로 받습니다
                      </Body>
                    </div>
                    <Switch id="push" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-krds-gray-20">
                    <div>
                      <Body size="md" weight="semibold">
                        이메일 알림
                      </Body>
                      <Body size="sm" className="text-krds-gray-60">
                        주간 뉴스레터를 이메일로 받습니다
                      </Body>
                    </div>
                    <Switch id="email" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Body size="md" weight="semibold">
                        SMS 알림
                      </Body>
                      <Body size="sm" className="text-krds-gray-60">
                        중요한 알림을 SMS로 받습니다
                      </Body>
                    </div>
                    <Switch id="sms" />
                  </div>
                </div>
              </ComponentPreview>
            </Subsection>
          </Section>

          {/* 5. 사용 가이드라인 */}
          <Section level="h2">
            <Heading level="h2" id="best-practices" title="사용 가이드라인" />

            <Subsection level="h3">
              <Heading level="h3" title="언제 사용하나요?" />
              <DoCard title="Switch 사용이 적합한 경우">
                <List variant="check">
                  <ListItem>즉시 적용되는 설정 변경</ListItem>
                  <ListItem>켜기/끄기 토글</ListItem>
                  <ListItem>기능 활성화/비활성화</ListItem>
                  <ListItem>실시간으로 결과가 반영되는 옵션</ListItem>
                  <ListItem>독립적인 설정 항목</ListItem>
                </List>
              </DoCard>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="언제 사용하지 말아야 하나요?" />
              <DontCard title="Switch 사용을 피해야 하는 경우">
                <List variant="dash">
                  <ListItem>저장 버튼이 필요한 폼 (Checkbox 사용)</ListItem>
                  <ListItem>여러 옵션 중 선택 (Radio 사용)</ListItem>
                  <ListItem>다중 선택 (Checkbox 사용)</ListItem>
                  <ListItem>약관 동의 (Checkbox 사용)</ListItem>
                </List>
              </DontCard>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Switch vs Checkbox"
                description="Switch와 Checkbox의 차이점을 이해하고 적절히 사용하세요."
              />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>구분</TableHead>
                    <TableHead>Switch</TableHead>
                    <TableHead>Checkbox</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>적용 시점</TableCell>
                    <TableCell>즉시 적용</TableCell>
                    <TableCell>저장 버튼 클릭 후 적용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>시각적 피드백</TableCell>
                    <TableCell>명확한 켜짐/꺼짐 상태</TableCell>
                    <TableCell>체크 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>사용 맥락</TableCell>
                    <TableCell>설정, 환경설정</TableCell>
                    <TableCell>폼, 동의, 다중 선택</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>물리적 비유</TableCell>
                    <TableCell>조명 스위치</TableCell>
                    <TableCell>체크리스트</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>

          {/* 6. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="키보드 지원" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>키</TableHead>
                    <TableHead>동작</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>Space</Code>
                    </TableCell>
                    <TableCell>스위치 상태 전환</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Tab</Code>
                    </TableCell>
                    <TableCell>다음 포커스 가능한 요소로 이동</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>Shift + Tab</Code>
                    </TableCell>
                    <TableCell>이전 포커스 가능한 요소로 이동</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="ARIA 속성" />
              <List>
                <ListItem>
                  <Code>role=&quot;switch&quot;</Code>: 스위치 역할 명시
                </ListItem>
                <ListItem>
                  <Code>aria-checked</Code>: 켜짐/꺼짐 상태 전달
                </ListItem>
                <ListItem>
                  <Code>aria-invalid</Code>: 에러 상태 전달
                </ListItem>
                <ListItem>
                  <Code>aria-describedby</Code>: helper text, error 메시지 연결
                </ListItem>
                <ListItem>
                  FormField와 함께 사용 시 label, error, helperText 자동 연결
                </ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Switch Props" />
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
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'sm' | 'md' | 'lg'</Code>
                    </TableCell>
                    <TableCell>'md'</TableCell>
                    <TableCell>스위치 크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>status</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'error' | 'success' | 'info'
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>스위치 상태</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>checked</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>켜짐 상태 (제어 컴포넌트)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>defaultChecked</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>초기 켜짐 상태 (비제어 컴포넌트)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onCheckedChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (checked: boolean) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>상태 변경 시 호출</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">React.ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>라벨 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>labelPosition</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'left' | 'right'</Code>
                    </TableCell>
                    <TableCell>'right'</TableCell>
                    <TableCell>라벨 위치</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>비활성화 상태</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>id</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>스위치 ID (label 연결용)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Structured List', href: '/components/structured-list' }}
        next={{ title: 'Tab Bars', href: '/components/tabbars' }}
      />
    </>
  );
}
