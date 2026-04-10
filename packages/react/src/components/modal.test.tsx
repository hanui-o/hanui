import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import { Modal, ModalTitle, ModalBody, ModalFooter } from './modal';

describe('Modal', () => {
  it('open이 true일 때 렌더링되어야 합니다', () => {
    render(
      <Modal open onClose={() => {}}>
        <ModalTitle>제목</ModalTitle>
        <ModalBody>내용</ModalBody>
      </Modal>
    );
    expect(screen.getByText('제목')).toBeInTheDocument();
    expect(screen.getByText('내용')).toBeInTheDocument();
  });

  it('open이 false일 때 렌더링되지 않아야 합니다', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        <ModalTitle>제목</ModalTitle>
        <ModalBody>내용</ModalBody>
      </Modal>
    );
    expect(screen.queryByText('제목')).not.toBeInTheDocument();
  });

  it('dialog role을 가져야 합니다', () => {
    render(
      <Modal open onClose={() => {}}>
        <ModalTitle>제목</ModalTitle>
        <ModalBody>내용</ModalBody>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('닫기 버튼이 있어야 합니다', () => {
    render(
      <Modal open onClose={() => {}}>
        <ModalTitle>제목</ModalTitle>
        <ModalBody>내용</ModalBody>
      </Modal>
    );
    expect(screen.getByText('닫기')).toBeInTheDocument();
  });

  it('ESC 키로 닫을 수 있어야 합니다', async () => {
    const user = userEvent.setup();
    let closed = false;
    render(
      <Modal open onClose={() => (closed = true)}>
        <ModalTitle>제목</ModalTitle>
        <ModalBody>내용</ModalBody>
      </Modal>
    );
    await user.keyboard('{Escape}');
    expect(closed).toBe(true);
  });

  it('ModalFooter가 렌더링되어야 합니다', () => {
    render(
      <Modal open onClose={() => {}}>
        <ModalTitle>제목</ModalTitle>
        <ModalBody>내용</ModalBody>
        <ModalFooter>
          <button>확인</button>
        </ModalFooter>
      </Modal>
    );
    expect(screen.getByText('확인')).toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { baseElement } = render(
      <Modal open onClose={() => {}}>
        <ModalTitle>접근성 테스트</ModalTitle>
        <ModalBody>모달 내용입니다</ModalBody>
      </Modal>
    );
    const results = await axe(baseElement);
    expect(results).toHaveNoViolations();
  });
});
