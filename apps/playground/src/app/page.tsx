'use client';

import {
  Button,
  Container,
  Display,
  Body,
  Stack,
  Card,
  Input,
} from '@hanui/react';
import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <Container className="py-10">
      <Stack gap="xl">
        <div>
          <Display size="lg">HANUI Playground</Display>
          <Body size="lg" className="mt-2">
            Get Started 문서를 따라 컴포넌트를 테스트해보세요!
          </Body>
        </div>

        <Card>
          <Stack gap="md">
            <Body size="lg" className="font-medium">
              Button 예제
            </Body>
            <div className="flex gap-2 flex-wrap">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Button</Button>
            </div>
          </Stack>
        </Card>

        <Card>
          <Stack gap="md">
            <Body size="lg" className="font-medium">
              Counter 예제
            </Body>
            <div className="flex items-center gap-4">
              <Button onClick={() => setCount(count - 1)}>-</Button>
              <Body size="xl" className="font-mono font-bold">
                {count}
              </Body>
              <Button onClick={() => setCount(count + 1)}>+</Button>
            </div>
          </Stack>
        </Card>

        <Card>
          <Stack gap="md">
            <Body size="lg" className="font-medium">
              Input 예제
            </Body>
            <Input placeholder="이름을 입력하세요" />
            <Input type="email" placeholder="이메일을 입력하세요" />
            <Input type="password" placeholder="비밀번호를 입력하세요" />
          </Stack>
        </Card>

        <Card variant="info">
          <Stack gap="sm">
            <Body size="md" className="font-medium">
              💡 시작 가이드
            </Body>
            <Body size="sm">
              1. 이 페이지에서 컴포넌트를 직접 테스트해보세요
              <br />
              2. <code>src/app/page.tsx</code> 파일을 수정하여 다른 컴포넌트도
              테스트해보세요
              <br />
              3. 문서 사이트 (http://localhost:3000)에서 API 레퍼런스를
              확인하세요
            </Body>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
