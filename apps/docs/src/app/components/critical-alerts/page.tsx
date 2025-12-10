'use client';

// Docs layout
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
  Installation,
} from '@/components/content';

// Docs helper
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI Components
import {
  CriticalAlerts,
  CriticalAlertItem,
  CriticalAlertBanner,
  Code,
  List,
  ListItem,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@hanui/react';

export default function CriticalAlertsPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Critical Alerts"
        description="사용자에게 긴급하거나 중요한 정보를 전달하는 컴포넌트입니다. KRDS 긴급 공지 가이드라인을 준수합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <CriticalAlerts>
                <CriticalAlertItem
                  variant="danger"
                  message="긴급 공지 내용 표시"
                  href="#"
                />
                <CriticalAlertItem
                  variant="ok"
                  message="긴급 공지 내용 표시"
                  href="#"
                />
                <CriticalAlertItem
                  variant="info"
                  message="긴급 공지 내용 표시"
                  href="#"
                />
              </CriticalAlerts>
            </ComponentPreview>

            <Code variant="block" language="tsx">
              {`import { CriticalAlerts, CriticalAlertItem } from '@/components/hanui/critical-alerts';

<CriticalAlerts>
  <CriticalAlertItem
    variant="danger"
    message="긴급 공지 내용 표시"
    href="/notice"
  />
  <CriticalAlertItem
    variant="ok"
    message="안전 상태 공지"
    href="/notice"
  />
  <CriticalAlertItem
    variant="info"
    message="일반 안내 공지"
    href="/notice"
  />
</CriticalAlerts>`}
            </Code>
          </Section>

          {/* 설치 */}
          <Section level="h2">
            <Installation componentName="critical-alerts" />
          </Section>

          {/* 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="CriticalAlerts 컨테이너 안에 CriticalAlertItem을 배치합니다. 각 아이템은 variant로 긴급도를 지정합니다."
            />

            <Code variant="block" language="tsx">
              {`import { CriticalAlerts, CriticalAlertItem } from '@/components/hanui/critical-alerts';

<CriticalAlerts>
  <CriticalAlertItem
    variant="danger"
    message="재난 상황 발생. 안전에 유의하세요."
    href="/disaster"
  />
</CriticalAlerts>`}
            </Code>
          </Section>

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="Variant"
                description="variant prop으로 긴급도를 지정합니다: danger(긴급), ok(안전), info(안내)"
              />
              <ComponentPreview>
                <CriticalAlerts>
                  <CriticalAlertItem
                    variant="danger"
                    message="전산 시스템 장애로 인해 서비스 이용이 일시 중단되었습니다."
                    href="#"
                  />
                </CriticalAlerts>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 긴급 (danger) - 재난/재해, 예고 없는 서비스 장애
<CriticalAlertItem variant="danger" message="서비스 장애 발생" href="#" />

// 안전 (ok) - 재난/재해 상황 종료
<CriticalAlertItem variant="ok" message="상황 종료, 정상 운영 중" href="#" />

// 안내 (info) - 사용자가 인지해야 하는 정보
<CriticalAlertItem variant="info" message="새로운 시스템 적용 안내" href="#" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="커스텀 레이블"
                description="label prop으로 기본 레이블(긴급/안전/안내)을 변경할 수 있습니다."
              />
              <ComponentPreview>
                <CriticalAlerts>
                  <CriticalAlertItem
                    variant="danger"
                    label="재난경보"
                    message="지진 발생! 즉시 안전한 곳으로 대피하세요."
                    href="#"
                  />
                </CriticalAlerts>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<CriticalAlertItem
  variant="danger"
  label="재난경보"
  message="지진 발생! 즉시 안전한 곳으로 대피하세요."
  href="/emergency"
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="배너 스타일"
                description="전체 너비 배너 스타일이 필요한 경우 CriticalAlertBanner를 사용합니다."
              />
              <ComponentPreview>
                <div className="w-full space-y-2">
                  <CriticalAlertBanner
                    variant="danger"
                    message="태풍 경보 발령. 외출을 자제해 주세요."
                    href="#"
                  />
                  <CriticalAlertBanner
                    variant="ok"
                    message="태풍 경보 해제. 정상 운영됩니다."
                    href="#"
                  />
                  <CriticalAlertBanner
                    variant="info"
                    message="12월 31일 24시간 민원 접수 가능합니다."
                    href="#"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`import { CriticalAlertBanner } from '@/components/hanui/critical-alerts';

<CriticalAlertBanner
  variant="danger"
  message="태풍 경보 발령. 외출을 자제해 주세요."
  href="/weather"
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="클릭 핸들러"
                description="href 대신 onLinkClick으로 클릭 이벤트를 처리할 수 있습니다."
              />
              <Code variant="block" language="tsx">
                {`<CriticalAlertItem
  variant="info"
  message="새로운 공지가 있습니다."
  onLinkClick={() => openModal('notice')}
/>`}
              </Code>
            </Subsection>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List>
              <ListItem>
                <Code>role=&quot;list&quot;</Code>, <Code>aria-label</Code>로
                목록 역할 명시
              </ListItem>
              <ListItem>
                배너 스타일은 <Code>role=&quot;alert&quot;</Code>,{' '}
                <Code>aria-live=&quot;polite&quot;</Code> 적용
              </ListItem>
              <ListItem>아이콘은 장식용으로 스크린리더에서 숨김 처리</ListItem>
              <ListItem>링크/버튼에 키보드 포커스 스타일 제공</ListItem>
            </List>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="CriticalAlerts Props" />
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
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>CriticalAlertItem 요소들</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="CriticalAlertItem Props" />
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
                        &quot;danger&quot; | &quot;ok&quot; | &quot;info&quot;
                      </Code>
                    </TableCell>
                    <TableCell>&quot;info&quot;</TableCell>
                    <TableCell>긴급도 유형</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>variant별 기본값</TableCell>
                    <TableCell>뱃지 레이블 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>message</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>공지 내용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>href</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>링크 URL</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>linkText</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>&quot;자세히 보기&quot;</TableCell>
                    <TableCell>링크 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onLinkClick</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">() =&gt; void</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>링크 클릭 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>hideIcon</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>아이콘 숨김 여부</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="CriticalAlertBanner Props" />
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
                        &quot;danger&quot; | &quot;ok&quot; | &quot;info&quot;
                      </Code>
                    </TableCell>
                    <TableCell>&quot;info&quot;</TableCell>
                    <TableCell>긴급도 유형</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>label</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>variant별 기본값</TableCell>
                    <TableCell>뱃지 레이블 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>message</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>공지 내용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>href</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>링크 URL</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>linkText</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>&quot;자세히 보기&quot;</TableCell>
                    <TableCell>링크 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onLinkClick</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">() =&gt; void</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>링크 클릭 핸들러</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Combobox', href: '/components/combobox' }}
        next={{ title: 'DataTable', href: '/components/data-table' }}
      />
    </>
  );
}
