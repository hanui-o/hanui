'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  List,
  ListItem,
  Code,
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

export default function ListPage() {
  return (
    <>
      <Heading
        level="h1"
        title="List"
        description="항목들을 깔끔하게 나열하기 위한 리스트 컴포넌트"
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* ========== 개요 탭 ========== */}
        <TabsContent value="overview">
          {/* 1) 개요 - 기본 예제 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <List>
                <ListItem>첫 번째 항목</ListItem>
                <ListItem>두 번째 항목</ListItem>
                <ListItem>세 번째 항목</ListItem>
              </List>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<List>
  <ListItem>첫 번째 항목</ListItem>
  <ListItem>두 번째 항목</ListItem>
  <ListItem>세 번째 항목</ListItem>
</List>`}
            </Code>
          </Section>

          {/* 2) 설치 */}
          <Section level="h2">
            <Installation componentName="list" />
          </Section>

          {/* 3) 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="List와 ListItem을 import하여 사용합니다. variant로 리스트 스타일을 지정합니다."
            />
            <Code variant="block" language="tsx">
              {`import { List, ListItem } from '@hanui/react'

<List>
  <ListItem>첫 번째 항목</ListItem>
  <ListItem>두 번째 항목</ListItem>
  <ListItem>세 번째 항목</ListItem>
</List>`}
            </Code>
          </Section>

          {/* 4) 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* 순서 없는 목록 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="순서 없는 목록"
                description="unordered, dash, check 세 가지 variant를 제공합니다."
              />
              <ComponentPreview>
                <div className="flex flex-col gap-8 w-full">
                  <div>
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Unordered (•) - 기본
                    </div>
                    <List>
                      <ListItem>첫 번째 항목</ListItem>
                      <ListItem>두 번째 항목</ListItem>
                      <ListItem>세 번째 항목</ListItem>
                    </List>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Dash (−) - 보조 항목
                    </div>
                    <List variant="dash">
                      <ListItem>대시 항목 1</ListItem>
                      <ListItem>대시 항목 2</ListItem>
                      <ListItem>대시 항목 3</ListItem>
                    </List>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Check (✓) - 완료/체크 항목
                    </div>
                    <List variant="check">
                      <ListItem>완료된 항목 1</ListItem>
                      <ListItem>완료된 항목 2</ListItem>
                      <ListItem>완료된 항목 3</ListItem>
                    </List>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// Unordered (기본 - 동그라미)
<List>
  <ListItem>첫 번째 항목</ListItem>
  <ListItem>두 번째 항목</ListItem>
  <ListItem>세 번째 항목</ListItem>
</List>

// Dash (대시)
<List variant="dash">
  <ListItem>대시 항목 1</ListItem>
  <ListItem>대시 항목 2</ListItem>
  <ListItem>대시 항목 3</ListItem>
</List>

// Check (체크)
<List variant="check">
  <ListItem>완료된 항목 1</ListItem>
  <ListItem>완료된 항목 2</ListItem>
  <ListItem>완료된 항목 3</ListItem>
</List>`}
              </Code>
            </Subsection>

            {/* 순서 있는 목록 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="순서 있는 목록"
                description="ordered, ordered-alpha, ordered-circle 세 가지 variant를 제공합니다."
              />
              <ComponentPreview>
                <div className="flex flex-col gap-8 w-full">
                  <div>
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Ordered (1, 2, 3...) - 숫자 순서
                    </div>
                    <List variant="ordered">
                      <ListItem>첫 번째 단계</ListItem>
                      <ListItem>두 번째 단계</ListItem>
                      <ListItem>세 번째 단계</ListItem>
                    </List>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Ordered Alpha (a, b, c...) - 알파벳 순서
                    </div>
                    <List variant="ordered-alpha">
                      <ListItem>첫 번째 항목</ListItem>
                      <ListItem>두 번째 항목</ListItem>
                      <ListItem>세 번째 항목</ListItem>
                    </List>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Ordered Circle (①, ②, ③...) - 원형 번호
                    </div>
                    <List variant="ordered-circle">
                      <ListItem>첫 번째 항목</ListItem>
                      <ListItem>두 번째 항목</ListItem>
                      <ListItem>세 번째 항목</ListItem>
                    </List>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// Ordered (숫자)
<List variant="ordered">
  <ListItem>첫 번째 단계</ListItem>
  <ListItem>두 번째 단계</ListItem>
  <ListItem>세 번째 단계</ListItem>
</List>

// Ordered Alpha (알파벳)
<List variant="ordered-alpha">
  <ListItem>첫 번째 항목</ListItem>
  <ListItem>두 번째 항목</ListItem>
  <ListItem>세 번째 항목</ListItem>
</List>

// Ordered Circle (원형 번호)
<List variant="ordered-circle">
  <ListItem>첫 번째 항목</ListItem>
  <ListItem>두 번째 항목</ListItem>
  <ListItem>세 번째 항목</ListItem>
</List>`}
              </Code>
            </Subsection>

            {/* 2depth 중첩 리스트 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="2depth 중첩 리스트"
                description="ListItem 내부에 List를 중첩하면 자동으로 dash 스타일이 적용됩니다."
              />
              <ComponentPreview>
                <List>
                  <ListItem>
                    사용자가 한 개의 항목을 선택할 수 있는 경우
                    <List>
                      <ListItem>라디오 버튼을 사용합니다</ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    옵션을 선택하거나 해제하는 경우
                    <List>
                      <ListItem>토글 스위치를 사용합니다</ListItem>
                      <ListItem>
                        부분적으로 옵션을 활성화할 수 있습니다
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    여러 개의 항목을 선택할 수 있는 경우
                    <List>
                      <ListItem>체크박스를 사용합니다</ListItem>
                      <ListItem>
                        선택된 항목의 개수를 표시할 수 있습니다
                      </ListItem>
                    </List>
                  </ListItem>
                </List>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<List>
  <ListItem>
    사용자가 한 개의 항목을 선택할 수 있는 경우
    <List>
      <ListItem>라디오 버튼을 사용합니다</ListItem>
    </List>
  </ListItem>
  <ListItem>
    옵션을 선택하거나 해제하는 경우
    <List>
      <ListItem>토글 스위치를 사용합니다</ListItem>
      <ListItem>부분적으로 옵션을 활성화할 수 있습니다</ListItem>
    </List>
  </ListItem>
</List>`}
              </Code>
            </Subsection>

            {/* 3depth 중첩 리스트 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="3depth 중첩 리스트"
                description="최대 3단계까지 중첩이 가능하며, 각 레벨마다 다른 인디케이터가 적용됩니다."
              />
              <ComponentPreview>
                <List>
                  <ListItem>
                    컴포넌트 설계 원칙
                    <List>
                      <ListItem>
                        접근성을 최우선으로 고려
                        <List>
                          <ListItem>키보드 내비게이션 지원</ListItem>
                          <ListItem>스크린 리더 호환성</ListItem>
                          <ListItem>ARIA 속성 활용</ListItem>
                        </List>
                      </ListItem>
                      <ListItem>
                        일관된 디자인 시스템
                        <List>
                          <ListItem>KRDS 색상 팔레트 준수</ListItem>
                          <ListItem>타이포그래피 규칙 적용</ListItem>
                        </List>
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    개발 가이드
                    <List>
                      <ListItem>
                        코드 품질 관리
                        <List>
                          <ListItem>TypeScript 타입 안정성</ListItem>
                          <ListItem>ESLint 규칙 준수</ListItem>
                        </List>
                      </ListItem>
                    </List>
                  </ListItem>
                </List>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<List>
  <ListItem>
    Level 1 항목 (•)
    <List>
      <ListItem>
        Level 2 항목 (−)
        <List>
          <ListItem>Level 3 항목 (○)</ListItem>
          <ListItem>Level 3 항목 2 (○)</ListItem>
        </List>
      </ListItem>
    </List>
  </ListItem>
</List>`}
              </Code>
            </Subsection>

            {/* Spacing */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="간격"
                description="spacing prop으로 항목 간 간격을 조절합니다."
              />
              <ComponentPreview>
                <div className="flex flex-col gap-8 w-full">
                  <div>
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Tight - 간격이 좁은 경우
                    </div>
                    <List spacing="tight">
                      <ListItem>항목 1</ListItem>
                      <ListItem>항목 2</ListItem>
                      <ListItem>항목 3</ListItem>
                    </List>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Default - 일반적인 경우
                    </div>
                    <List spacing="default">
                      <ListItem>항목 1</ListItem>
                      <ListItem>항목 2</ListItem>
                      <ListItem>항목 3</ListItem>
                    </List>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Loose - 간격이 넓은 경우
                    </div>
                    <List spacing="loose">
                      <ListItem>항목 1</ListItem>
                      <ListItem>항목 2</ListItem>
                      <ListItem>항목 3</ListItem>
                    </List>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// Tight spacing
<List spacing="tight">
  <ListItem>항목 1</ListItem>
</List>

// Default spacing
<List spacing="default">
  <ListItem>항목 1</ListItem>
</List>

// Loose spacing
<List spacing="loose">
  <ListItem>항목 1</ListItem>
</List>`}
              </Code>
            </Subsection>
          </Section>

          {/* 5) 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="List는 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>시맨틱 HTML:</strong> <Code>&lt;ul&gt;</Code>,{' '}
                <Code>&lt;ol&gt;</Code>, <Code>&lt;li&gt;</Code> 태그를 사용하여
                스크린 리더를 지원합니다.
              </ListItem>
              <ListItem>
                <strong>자동 중첩 처리:</strong> ListItem 안에 List를 넣으면
                자동으로 depth가 증가하며 적절한 들여쓰기와 아이콘을 제공합니다
                (최대 3depth).
              </ListItem>
              <ListItem>
                <strong>CSS ::before 활용:</strong> 인디케이터는{' '}
                <Code>::before</Code> 가상 요소로 구현되어 깔끔한 마크업을
                유지합니다.
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        {/* ========== API 탭 ========== */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="List Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>속성</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'unordered' | 'ordered' | 'ordered-alpha' |
                        'ordered-circle' | 'dash' | 'check'
                      </Code>
                    </TableCell>
                    <TableCell>'unordered'</TableCell>
                    <TableCell>리스트 타입</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>spacing</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'tight' | 'default' | 'loose'
                      </Code>
                    </TableCell>
                    <TableCell>'default'</TableCell>
                    <TableCell>항목 간 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>level</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">1 | 2 | 3</Code>
                    </TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>리스트 중첩 깊이 (자동 설정)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>자식 요소 (ListItem)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="ListItem Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>속성</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>showIndicator</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>불릿/번호 표시 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>자식 요소</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Link', href: '/components/link' }}
        next={{ title: 'Main Menu', href: '/components/mainmenu' }}
      />
    </>
  );
}
