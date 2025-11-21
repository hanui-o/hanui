'use client';

import { useEffect, useCallback, useState, useRef } from 'react';

/**
 * KRDS Header Logic Hook
 *
 * KRDS 공식 JavaScript 로직을 React Hook으로 변환
 * 원본 소스: krds_mainMenuMobile 함수
 */

export interface UseHeaderLogicOptions {
  /**
   * 모바일 메뉴 초기 열림 상태
   * @default false
   */
  initialOpen?: boolean;
}

export function useHeaderLogic(options: UseHeaderLogicOptions = {}) {
  const { initialOpen = false } = options;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(initialOpen);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  /**
   * 모바일 메뉴 열기
   */
  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);

    // body 스크롤 방지
    document.body.style.overflow = 'hidden';

    // 모바일 메뉴에 포커스 이동
    setTimeout(() => {
      const firstFocusable = mobileNavRef.current?.querySelector<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }, 100);
  }, []);

  /**
   * 모바일 메뉴 닫기
   */
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);

    // body 스크롤 복원
    document.body.style.overflow = '';

    // 햄버거 버튼으로 포커스 복원
    setTimeout(() => {
      mobileMenuButtonRef.current?.focus();
    }, 100);
  }, []);

  /**
   * 모바일 메뉴 토글
   */
  const toggleMobileMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }, [isMobileMenuOpen, closeMobileMenu, openMobileMenu]);

  /**
   * Overlay 클릭 시 메뉴 닫기
   */
  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      // Panel 내부 클릭은 무시
      if ((event.target as HTMLElement).closest('[data-mobile-panel]')) {
        return;
      }
      closeMobileMenu();
    },
    [closeMobileMenu]
  );

  /**
   * ESC 키로 메뉴 닫기
   */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  /**
   * 포커스 트랩 (모바일 메뉴 내부에만 포커스 유지)
   */
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleFocusTrap = (event: FocusEvent) => {
      const mobileNav = mobileNavRef.current;
      if (!mobileNav) return;

      const focusableElements = mobileNav.querySelectorAll<HTMLElement>(
        'a, button, input, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Tab 키 처리
      if (event.target === lastElement && !event.shiftKey) {
        event.preventDefault();
        firstElement.focus();
      } else if (event.target === firstElement && event.shiftKey) {
        event.preventDefault();
        lastElement.focus();
      }

      // 모바일 메뉴 외부로 포커스 이동 방지
      if (!mobileNav.contains(event.target as Node)) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    // Capture phase에서 포커스 이벤트 처리
    document.addEventListener('focus', handleFocusTrap as EventListener, true);

    return () => {
      document.removeEventListener(
        'focus',
        handleFocusTrap as EventListener,
        true
      );
    };
  }, [isMobileMenuOpen]);

  /**
   * Submenu 토글 (2-depth 메뉴)
   */
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());

  const toggleSubmenu = useCallback((menuId: string) => {
    setOpenSubmenus((prev) => {
      const next = new Set(prev);
      if (next.has(menuId)) {
        next.delete(menuId);
      } else {
        next.add(menuId);
      }
      return next;
    });
  }, []);

  const isSubmenuOpen = useCallback(
    (menuId: string) => {
      return openSubmenus.has(menuId);
    },
    [openSubmenus]
  );

  /**
   * ARIA 속성 설정
   */
  const getAriaAttributes = useCallback(
    () => ({
      mobileMenuButton: {
        'aria-expanded': isMobileMenuOpen,
        'aria-controls': 'krds-mobile-nav',
        'aria-label': isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기',
      },
      mobileNav: {
        id: 'krds-mobile-nav',
        role: 'navigation',
        'aria-label': '주요 메뉴',
        'aria-hidden': !isMobileMenuOpen,
      },
      desktopNav: {
        role: 'navigation',
        'aria-label': '주요 메뉴',
      },
    }),
    [isMobileMenuOpen]
  );

  /**
   * 컴포넌트 언마운트 시 정리
   */
  useEffect(() => {
    return () => {
      // body 스크롤 복원
      document.body.style.overflow = '';
    };
  }, []);

  return {
    // 상태
    isMobileMenuOpen,
    openSubmenus,

    // Refs
    mobileNavRef,
    mobileMenuButtonRef,

    // 액션
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,
    handleOverlayClick,
    toggleSubmenu,
    isSubmenuOpen,

    // ARIA 속성
    getAriaAttributes,
  };
}
