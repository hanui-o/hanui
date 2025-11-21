'use client';

import * as React from 'react';
import styles from './header.module.scss';

/**
 * Header Navigation Link
 */
export interface HeaderNavLink {
  label: string;
  href: string;
  active?: boolean;
  children?: HeaderNavLink[];
}

/**
 * Header Utility Link
 */
export interface HeaderUtilityLink {
  label: string;
  href: string;
  icon?: React.ReactElement;
}

/**
 * Header Props
 */
export interface HeaderProps {
  /**
   * Service name
   */
  serviceName: string;

  /**
   * Service logo
   */
  logo?: string | React.ReactElement;

  /**
   * Logo alt text (required if logo is string)
   */
  logoAlt?: string;

  /**
   * Home link href
   * @default "/"
   */
  homeHref?: string;

  /**
   * Utility navigation links (login, signup, etc.)
   */
  utilityLinks?: HeaderUtilityLink[];

  /**
   * Main navigation links
   */
  navLinks?: HeaderNavLink[];

  /**
   * Show search
   * @default false
   */
  showSearch?: boolean;

  /**
   * Search placeholder
   * @default "검색어를 입력하세요"
   */
  searchPlaceholder?: string;

  /**
   * Search submit handler
   */
  onSearch?: (query: string) => void;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Sticky header
   * @default true
   */
  sticky?: boolean;
}

/**
 * Header Component
 *
 * **Foundation Layer Features:**
 * - Required ID: #krds-header (KRDS mandatory)
 * - KRDS Layout Structure: Utility Nav + Branding + Main Nav + Mobile Menu
 * - WCAG 2.1 / KWCAG 2.2 Compliance
 * - Responsive Design: Desktop/Tablet/Mobile
 * - Keyboard Navigation & Focus Management
 *
 * **KRDS Standards:**
 * - Government website header with official branding
 * - Contains service identity, utility links, and main navigation
 * - Supports multi-level navigation menus
 * - Mobile-responsive with hamburger menu
 * - Sticky positioning on scroll
 *
 * @example
 * ```tsx
 * <Header
 *   serviceName="국민건강보험공단"
 *   logo="/logo.svg"
 *   logoAlt="국민건강보험공단 로고"
 *   utilityLinks={[
 *     { label: '로그인', href: '/login' },
 *     { label: '회원가입', href: '/signup' }
 *   ]}
 *   navLinks={[
 *     { label: '소개', href: '/about' },
 *     {
 *       label: '서비스',
 *       href: '/services',
 *       children: [
 *         { label: '건강검진', href: '/services/checkup' },
 *         { label: '보험료 조회', href: '/services/premium' }
 *       ]
 *     }
 *   ]}
 *   showSearch
 * />
 * ```
 */
export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      serviceName,
      logo,
      logoAlt,
      homeHref = '/',
      utilityLinks = [],
      navLinks = [],
      showSearch = false,
      searchPlaceholder = '검색어를 입력하세요',
      onSearch,
      className,
      sticky = true,
    },
    ref
  ) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [activeSubMenu, setActiveSubMenu] = React.useState<number | null>(
      null
    );
    const [isScrolled, setIsScrolled] = React.useState(false);

    // Handle scroll for sticky header
    React.useEffect(() => {
      if (!sticky) return;

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [sticky]);

    // Handle search submit
    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (onSearch && searchQuery.trim()) {
        onSearch(searchQuery);
      }
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
      if (!isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    // Close mobile menu
    React.useEffect(() => {
      return () => {
        document.body.style.overflow = '';
      };
    }, []);

    return (
      <>
        {/* header*/}
        <header id="krds-header">
          {/* 헤더 컨텐츠 영역 */}
          <div className="header-in">
            {/* 헤더 상단 기타메뉴*/}
            <div className="header-container">
              <div className="inner">
                <div className="header-utility">
                  <ul className="utility-list">
                    <li>
                      <a
                        href="#"
                        className="krds-btn small text"
                        target="_blank"
                        title="새 창 열기"
                      >
                        메뉴명 <i className="svg-icon ico-go"></i>
                      </a>
                    </li>
                    <li>
                      <div className="krds-drop-wrap">
                        <button
                          type="button"
                          className="krds-btn small text drop-btn"
                        >
                          메뉴명 <i className="svg-icon ico-toggle"></i>
                        </button>
                        <div className="drop-menu">
                          <div className="drop-in">
                            <ul className="drop-list">
                              <li>
                                <a href="#" className="item-link">
                                  메뉴명
                                </a>
                              </li>
                              <li>
                                <a href="#" className="item-link">
                                  메뉴명
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="krds-drop-wrap krds-resize">
                        <button
                          type="button"
                          className="krds-btn small text drop-btn"
                        >
                          메뉴명 <i className="svg-icon ico-toggle"></i>
                        </button>
                        <div className="drop-menu">
                          <div className="drop-in">
                            <ul className="drop-list">
                              <li>
                                <button type="button" className="item-link sm">
                                  메뉴명
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="item-link md active"
                                >
                                  메뉴명
                                </button>
                              </li>
                              <li>
                                <button type="button" className="item-link lg">
                                  메뉴명
                                </button>
                              </li>
                              <li>
                                <button type="button" className="item-link xlg">
                                  메뉴명
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="item-link xxlg"
                                >
                                  메뉴명
                                </button>
                              </li>
                            </ul>
                            <div className="drop-bottom">
                              <button
                                type="button"
                                className="krds-btn medium text"
                              >
                                <i className="svg-icon ico-reset"></i> 초기화
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="krds-drop-wrap">
                        <button
                          type="button"
                          className="krds-btn small text drop-btn"
                        >
                          메뉴명 <i className="svg-icon ico-toggle"></i>
                        </button>
                        <div className="drop-menu">
                          <div className="drop-in">
                            <ul className="drop-list">
                              <li>
                                <a
                                  href="#"
                                  className="item-link ico-go"
                                  target="_blank"
                                  title="새 창 열림"
                                >
                                  메뉴명
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="item-link ico-go"
                                  target="_blank"
                                  title="새 창 열림"
                                >
                                  메뉴명
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="item-link ico-go"
                                  target="_blank"
                                  title="새 창 열림"
                                >
                                  메뉴명
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="header-branding">
                  <h2 className="logo">
                    <a href="#">
                      <span className="sr-only">
                        KRDS - Korea Design System
                      </span>
                    </a>
                  </h2>
                  <div className="header-actions">
                    <button
                      type="button"
                      className="btn-navi sch"
                      title="통합검색 레이어"
                    >
                      통합검색
                    </button>
                    <a href="#" className="btn-navi login">
                      로그인
                    </a>
                    <button type="button" className="btn-navi join">
                      회원가입
                    </button>
                    <div className="krds-drop-wrap my-drop">
                      <button type="button" className="btn-navi my drop-btn">
                        나의 GOV
                      </button>
                      <div className="drop-menu">
                        <div className="drop-in">
                          <div className="drop-top">
                            <p className="my-name">홍길동님</p>
                            <dl className="my-time">
                              <dt>로그아웃까지 남은 시간</dt>
                              <dd>
                                <span className="time">12:00</span>
                                <button
                                  type="button"
                                  className="krds-btn medium text"
                                >
                                  시간 연장
                                </button>
                              </dd>
                            </dl>
                          </div>
                          <ul className="drop-list">
                            <li>
                              <a href="#" className="item-link">
                                나의 GOV 홈
                              </a>
                            </li>
                            <li>
                              <a href="#" className="item-link">
                                나의 신청내역
                              </a>
                            </li>
                            <li>
                              <a href="#" className="item-link">
                                나의 생활정보
                              </a>
                            </li>
                            <li>
                              <a href="#" className="item-link">
                                나의 정보관리
                              </a>
                            </li>
                          </ul>
                          <div className="drop-bottom">
                            <button
                              type="button"
                              className="krds-btn medium text"
                            >
                              <i className="svg-icon ico-logout"></i> 로그아웃
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-navi all"
                      aria-controls="mobile-nav"
                    >
                      전체메뉴
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* //헤더 상단 기타메뉴*/}

            {/* 메인메뉴 : 데스크탑*/}
            <nav className="krds-main-menu">
              <div className="inner">
                <ul className="gnb-menu">
                  <li>
                    <button
                      type="button"
                      className="gnb-main-trigger"
                      data-trigger="gnb"
                    >
                      1Depth
                    </button>
                    {/* gnb-toggle-wrap*/}
                    <div className="gnb-toggle-wrap">
                      {/* gnb-main-list*/}
                      <div className="gnb-main-list" data-has-submenu="true">
                        <ul>
                          <li>
                            <button
                              type="button"
                              className="gnb-sub-trigger"
                              data-trigger="gnb"
                            >
                              2Depth
                            </button>
                            {/* gnb-sub-list*/}
                            <div className="gnb-sub-list">
                              <div className="gnb-sub-content">
                                <h2 className="sub-title">
                                  2Depth title
                                  <a
                                    href="#"
                                    className="krds-btn link basic small"
                                  >
                                    <span className="underline">바로가기</span>
                                    <i className="svg-icon ico-angle right"></i>
                                  </a>
                                </h2>
                                <ul>
                                  <li>
                                    <a href="#">Last depth</a>
                                  </li>
                                  <li>
                                    <button type="button">Last depth</button>
                                  </li>
                                </ul>
                              </div>
                              <div className="gnb-sub-banner">
                                <span className="krds-badge bg-secondary">
                                  신규 서비스
                                </span>
                                <button
                                  type="button"
                                  className="krds-btn medium text"
                                >
                                  메뉴명{' '}
                                  <i className="svg-icon ico-angle right"></i>
                                </button>
                              </div>
                            </div>
                            {/* //gnb-sub-list*/}
                          </li>
                          <li>
                            <button
                              type="button"
                              className="gnb-sub-trigger"
                              data-trigger="gnb"
                            >
                              2Depth
                            </button>
                            {/* gnb-sub-list*/}
                            <div className="gnb-sub-list between">
                              <div className="gnb-sub-content">
                                <h2 className="sub-title">
                                  2Depth title
                                  <a
                                    href="#"
                                    className="krds-btn link basic small"
                                  >
                                    <span className="underline">바로가기</span>
                                    <i className="svg-icon ico-angle right"></i>
                                  </a>
                                </h2>
                                <ul>
                                  <li>
                                    <a href="#">Last depth</a>
                                  </li>
                                  <li>
                                    <button type="button">Last depth</button>
                                  </li>
                                  <li>
                                    <button type="button">Last depth</button>
                                  </li>
                                </ul>
                              </div>
                              <div className="gnb-sub-banner">
                                <span className="krds-badge bg-secondary">
                                  신규 서비스
                                </span>
                                <button
                                  type="button"
                                  className="krds-btn medium text"
                                >
                                  메뉴명{' '}
                                  <i className="svg-icon ico-angle right"></i>
                                </button>
                              </div>
                            </div>
                            {/* //gnb-sub-list*/}
                          </li>
                          <li>
                            <a
                              href="#"
                              className="gnb-sub-trigger is-link"
                              data-trigger="gnb"
                            >
                              2Depth
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="gnb-sub-trigger is-link external-link"
                              data-trigger="gnb"
                              target="_blank"
                              title="새 창 열림"
                            >
                              2Depth
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* //gnb-main-list*/}
                    </div>
                    {/* //gnb-toggle-wrap*/}
                  </li>

                  <li>
                    <button
                      type="button"
                      className="gnb-main-trigger"
                      data-trigger="gnb"
                    >
                      1Depth
                    </button>
                    {/* gnb-toggle-wrap*/}
                    <div className="gnb-toggle-wrap">
                      {/* gnb-main-list*/}
                      <div className="gnb-main-list" data-has-submenu="true">
                        <ul>
                          <li>
                            <button
                              type="button"
                              className="gnb-sub-trigger"
                              data-trigger="gnb"
                            >
                              2Depth
                            </button>
                            {/* gnb-sub-list*/}
                            <div className="gnb-sub-list">
                              <div className="gnb-sub-content">
                                <h2 className="sub-title">
                                  <span>2Depth title</span>
                                </h2>
                                <ul className="type-description">
                                  <li>
                                    <h3 className="tit">
                                      <a
                                        href="#"
                                        target="_blank"
                                        title="새 창 열림"
                                      >
                                        3Depth title{' '}
                                        <i className="svg-icon ico-go"></i>
                                      </a>
                                    </h3>
                                    <p className="txt">
                                      메뉴명과 메뉴에 관한 간략한 설명이
                                      표시되는 스타일입니다.
                                    </p>
                                  </li>
                                </ul>
                              </div>
                              <div className="gnb-sub-banner">
                                <span className="krds-badge bg-secondary">
                                  신규 서비스
                                </span>
                                <button
                                  type="button"
                                  className="krds-btn medium text"
                                >
                                  메뉴명{' '}
                                  <i className="svg-icon ico-angle right"></i>
                                </button>
                              </div>
                            </div>
                            {/* //gnb-sub-list*/}
                          </li>
                          <li>
                            <button
                              type="button"
                              className="gnb-sub-trigger"
                              data-trigger="gnb"
                            >
                              2Depth
                            </button>
                            {/* gnb-sub-list*/}
                            <div className="gnb-sub-list between">
                              <div className="gnb-sub-content">
                                <h2 className="sub-title">
                                  <span>2Depth title</span>
                                </h2>
                                <ul className="type-description">
                                  <li>
                                    <h3 className="tit">
                                      <a
                                        href="#"
                                        target="_blank"
                                        title="새 창 열림"
                                      >
                                        3Depth title{' '}
                                        <i className="svg-icon ico-go"></i>
                                      </a>
                                    </h3>
                                    <p className="txt">
                                      메뉴명과 메뉴에 관한 간략한 설명이
                                      표시되는 스타일입니다.
                                    </p>
                                  </li>
                                </ul>
                              </div>
                              <div className="gnb-sub-banner">
                                <span className="krds-badge bg-secondary">
                                  신규 서비스
                                </span>
                                <button
                                  type="button"
                                  className="krds-btn medium text"
                                >
                                  메뉴명{' '}
                                  <i className="svg-icon ico-angle right"></i>
                                </button>
                              </div>
                            </div>
                            {/* //gnb-sub-list*/}
                          </li>
                          <li>
                            <a
                              href="#"
                              className="gnb-sub-trigger is-link"
                              data-trigger="gnb"
                            >
                              2Depth
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="gnb-sub-trigger is-link external-link"
                              data-trigger="gnb"
                              target="_blank"
                              title="새 창 열림"
                            >
                              2Depth
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* //gnb-main-list*/}
                    </div>
                    {/* //gnb-toggle-wrap*/}
                  </li>

                  <li>
                    <button
                      type="button"
                      className="gnb-main-trigger"
                      data-trigger="gnb"
                    >
                      1Depth
                    </button>
                    {/* gnb-toggle-wrap*/}
                    <div className="gnb-toggle-wrap">
                      {/* gnb-main-list*/}
                      <div className="gnb-main-list">
                        {/* gnb-sub-list*/}
                        <div className="gnb-sub-list single-list between">
                          <div className="gnb-sub-content">
                            <h2 className="sub-title">
                              <span>2Depth title</span>
                            </h2>
                            <ul>
                              <li>
                                <a href="#">Last depth</a>
                              </li>
                              <li>
                                <a href="#">Last depth</a>
                              </li>
                              <li>
                                <a href="#">Last depth</a>
                              </li>
                              <li>
                                <a href="#">Last depth</a>
                              </li>
                              <li>
                                <a href="#">Last depth</a>
                              </li>
                              <li>
                                <a href="#">Last depth</a>
                              </li>
                              <li>
                                <a href="#">Last depth</a>
                              </li>
                              <li>
                                <a href="#">Last depth</a>
                              </li>
                              <li>
                                <a href="#">Last depth</a>
                              </li>
                            </ul>
                          </div>
                          <div className="gnb-sub-banner">
                            <span className="krds-badge bg-secondary">
                              신규 서비스
                            </span>
                            <button
                              type="button"
                              className="krds-btn medium text"
                            >
                              메뉴명{' '}
                              <i className="svg-icon ico-angle right"></i>
                            </button>
                          </div>
                        </div>
                        {/* //gnb-sub-list*/}
                      </div>
                      {/* //gnb-main-list*/}
                    </div>
                    {/* //gnb-toggle-wrap*/}
                  </li>

                  <li>
                    <a
                      href="#"
                      className="gnb-main-trigger is-link"
                      data-trigger="gnb"
                    >
                      링크(anchor)
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="gnb-main-trigger is-link"
                      data-trigger="gnb"
                    >
                      링크(anchor)
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
            {/* //메인메뉴 : 데스크탑*/}
          </div>
          {/* //헤더 컨텐츠 영역 */}

          {/* 메인메뉴 : 모바일*/}
          <div id="mobile-nav" className="krds-main-menu-mobile">
            <div className="gnb-wrap">
              {/* gnb-header*/}
              <div className="gnb-header">
                {/* gnb-utils*/}
                <div className="gnb-utils">
                  <ul className="utility-list">
                    <li>
                      <button type="button" className="krds-btn xsmall text">
                        메뉴명
                      </button>
                    </li>
                    <li>
                      <button type="button" className="krds-btn xsmall text">
                        메뉴명
                      </button>
                    </li>
                  </ul>
                </div>
                {/* //gnb-utils*/}
                {/* gnb-login*/}
                <div className="gnb-login">
                  {/* <span className="user">홍길동님</span>
					<button type="button" className="krds-btn large text"><i className="svg-icon ico-logout"></i> 로그아웃</button>*/}
                  <button type="button" className="krds-btn large text">
                    <i className="svg-icon ico-log"></i> 로그인을 해주세요
                  </button>
                </div>
                {/* //gnb-login*/}
                {/* gnb-service-menu*/}
                <div className="gnb-service-menu">
                  <a href="#" className="link">
                    메뉴명
                  </a>
                  <a href="#" className="link">
                    메뉴명
                  </a>
                  <a href="#" className="link">
                    메뉴명
                  </a>
                  <a href="#" className="link">
                    메뉴명
                  </a>
                </div>
                {/* gnb-service-menu*/}
                {/* 검색*/}
                <div className="sch-input">
                  <input
                    type="text"
                    className="krds-input"
                    placeholder="찾고자 하는 메뉴명을 입력해 주세요"
                    title="찾고자 하는 메뉴명 입력"
                  />
                  <button
                    type="button"
                    className="krds-btn medium icon ico-search"
                  >
                    <span className="sr-only">검색</span>
                    <i className="svg-icon ico-sch"></i>
                  </button>
                </div>
                {/* //검색*/}
              </div>
              {/* //gnb-header*/}

              {/* gnb-body*/}
              <div className="gnb-body">
                {/* gnb-menu*/}
                <div className="gnb-menu">
                  <div className="menu-wrap">
                    <ul>
                      <li>
                        <a href="#mGnb-anchor1" className="gnb-main-trigger">
                          1Depth
                        </a>
                      </li>
                      <li>
                        <a href="#mGnb-anchor2" className="gnb-main-trigger">
                          1Depth
                        </a>
                      </li>
                      <li>
                        <a href="#mGnb-anchor3" className="gnb-main-trigger">
                          1Depth
                        </a>
                      </li>
                      <li>
                        <a href="#mGnb-anchor4" className="gnb-main-trigger">
                          1Depth
                        </a>
                      </li>
                      <li>
                        <a href="#mGnb-anchor5" className="gnb-main-trigger">
                          1Depth
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="submenu-wrap">
                    <div className="gnb-sub-list" id="mGnb-anchor1">
                      <h2 className="sub-title">1Depth</h2>
                      <ul>
                        <li>
                          <a href="#" className="gnb-sub-trigger">
                            2Depth
                          </a>
                        </li>
                        <li>
                          <a href="#" className="gnb-sub-trigger">
                            2Depth
                          </a>
                        </li>
                        <li>
                          <a href="#" className="gnb-sub-trigger">
                            2Depth
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="gnb-sub-list" id="mGnb-anchor2">
                      <h2 className="sub-title">1Depth</h2>
                      <ul>
                        <li>
                          <a href="#" className="gnb-sub-trigger">
                            2Depth
                          </a>
                        </li>
                        <li>
                          <a href="#" className="gnb-sub-trigger">
                            2Depth
                          </a>
                        </li>
                        <li>
                          <a href="#" className="gnb-sub-trigger">
                            2Depth
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="gnb-sub-list" id="mGnb-anchor3">
                      <h2 className="sub-title">1Depth</h2>
                      <ul>
                        <li>
                          <a href="#" className="gnb-sub-trigger">
                            2Depth
                          </a>
                        </li>
                        <li>
                          <a href="#" className="gnb-sub-trigger">
                            2Depth
                          </a>
                        </li>
                        <li>
                          <a href="#" className="gnb-sub-trigger">
                            2Depth
                          </a>
                        </li>
                        <li>
                          <a href="#" className="gnb-sub-trigger has-depth3">
                            2Depth
                          </a>
                          <div className="depth3-wrap">
                            <ul>
                              <li>
                                <a
                                  href="#"
                                  className="depth3-trigger has-depth4"
                                >
                                  3Depth
                                </a>
                                <div className="depth4-wrap">
                                  <div className="depth4-head">
                                    <button
                                      type="button"
                                      className="krds-btn icon trigger-prev"
                                    >
                                      <span className="sr-only">이전화면</span>
                                      <i className="svg-icon ico-angle left"></i>
                                    </button>
                                    <button
                                      type="button"
                                      className="krds-btn icon trigger-close"
                                    >
                                      <span className="sr-only">
                                        전체메뉴 닫기
                                      </span>
                                      <i className="svg-icon ico-popup-close"></i>
                                    </button>
                                  </div>
                                  <ul className="depth4-body">
                                    <h4 className="sub-title">4Depth title</h4>
                                    <ul className="depth4-ul">
                                      <li>
                                        <a href="#">depth title</a>
                                      </li>
                                      <li>
                                        <a href="#">depth title</a>
                                      </li>
                                      <li>
                                        <a href="#">depth title</a>
                                      </li>
                                      <li>
                                        <a href="#">depth title</a>
                                      </li>
                                    </ul>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <a href="#" className="depth3-trigger">
                                  3Depth
                                </a>
                              </li>
                              <li>
                                <a href="#" className="depth3-trigger">
                                  3Depth
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="gnb-sub-list" id="mGnb-anchor4">
                      <h2 className="sub-title">1Depth</h2>
                      <ul>
                        <li>
                          <a href="#" className="gnb-sub-trigger">
                            2Depth
                          </a>
                        </li>
                        <li>
                          <a href="#" className="gnb-sub-trigger">
                            2Depth
                          </a>
                        </li>
                        <li>
                          <a href="#" className="gnb-sub-trigger">
                            2Depth
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="gnb-sub-list" id="mGnb-anchor5">
                      <h2 className="sub-title">1Depth</h2>
                      <ul>
                        <li>
                          <a href="#" className="gnb-sub-trigger">
                            2Depth
                          </a>
                        </li>
                        <li>
                          <a href="#" className="gnb-sub-trigger">
                            2Depth
                          </a>
                        </li>
                        <li>
                          <a href="#" className="gnb-sub-trigger">
                            2Depth
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* //gnb-menu*/}
                {/* gnb-bottom*/}
                <div className="gnb-bottom">
                  <a href="#" className="krds-btn medium text">
                    메뉴명 <i className="svg-icon ico-angle right"></i>
                  </a>
                  <a
                    href="#"
                    className="krds-btn medium text"
                    target="_blank"
                    title="새 창 열기"
                  >
                    {' '}
                    메뉴명 <i className="svg-icon ico-go"></i>
                  </a>
                </div>
                {/* //gnb-bottom*/}
              </div>
              {/* //gnb-body*/}

              {/* gnb-close*/}
              <button
                type="button"
                className="krds-btn medium icon"
                id="close-nav"
              >
                <span className="sr-only">전체메뉴 닫기</span>
                <i className="svg-icon ico-popup-close"></i>
              </button>
              {/* //gnb-close*/}
            </div>
          </div>
          {/* //메인메뉴 : 모바일*/}
        </header>
        {/* //header*/}
      </>
    );
  }
);

Header.displayName = 'Header';
