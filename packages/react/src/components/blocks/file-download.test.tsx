import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/setup';
import { FileDownload } from './file-download';

const files = [
  { name: '사업계획서', size: '2.3MB', extension: 'hwp', href: '#' },
  { name: '동의서', size: '150KB', extension: 'pdf', href: '#' },
];

describe('FileDownload', () => {
  it('aria-label이 있는 section으로 렌더링되어야 합니다', () => {
    render(<FileDownload files={files} />);
    expect(screen.getByLabelText('첨부파일')).toBeInTheDocument();
  });

  it('파일 개수가 표시되어야 합니다', () => {
    render(<FileDownload files={files} />);
    expect(screen.getByText('첨부파일 (2)')).toBeInTheDocument();
  });

  it('파일명이 표시되어야 합니다', () => {
    render(<FileDownload files={files} />);
    expect(screen.getByText('사업계획서')).toBeInTheDocument();
    expect(screen.getByText('동의서')).toBeInTheDocument();
  });

  it('확장자 뱃지가 대문자로 표시되어야 합니다', () => {
    render(<FileDownload files={files} />);
    expect(screen.getByText('HWP')).toBeInTheDocument();
    expect(screen.getByText('PDF')).toBeInTheDocument();
  });

  it('다운로드 버튼에 aria-label이 있어야 합니다', () => {
    render(<FileDownload files={files} />);
    expect(screen.getByLabelText('사업계획서 다운로드')).toBeInTheDocument();
    expect(screen.getByLabelText('동의서 다운로드')).toBeInTheDocument();
  });

  it('파일이 없으면 렌더링되지 않아야 합니다', () => {
    const { container } = render(<FileDownload files={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<FileDownload files={files} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
