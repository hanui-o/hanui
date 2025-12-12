import * as matchers from 'vitest-axe/matchers';
import { expect } from 'vitest';
import { configureAxe, axe as originalAxe } from 'vitest-axe';
import type { AxeResults } from 'axe-core';

expect.extend(matchers);

// 개별 컴포넌트 테스트에서는 region 규칙 비활성화
// (실제 페이지에서는 landmark가 있지만 단일 컴포넌트 테스트에서는 없음)
const axeOptions = {
  rules: {
    region: { enabled: false },
  },
};

export const axe = async (element: Element): Promise<AxeResults> => {
  return originalAxe(element, axeOptions);
};
