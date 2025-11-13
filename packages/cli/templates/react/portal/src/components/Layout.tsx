import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@hanui/react';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('검색:', searchQuery);
      // TODO: Implement search functionality
      alert(`"${searchQuery}" 검색 기능은 추후 구현 예정입니다.`);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="layout">
      {/* Skip Navigation */}
      <a href="#main-content" className="skip-link">
        본문으로 바로가기
      </a>

      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-top">
            <Link to="/" className="logo">
              <h1>민원포털</h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="gnb" aria-label="주요 메뉴">
              <Link
                to="/"
                className={`gnb-link ${isActive('/') ? 'active' : ''}`}
              >
                홈
              </Link>
              <Link
                to="/notice"
                className={`gnb-link ${isActive('/notice') ? 'active' : ''}`}
              >
                공지사항
              </Link>
              <Link
                to="/civil-complaint"
                className={`gnb-link ${isActive('/civil-complaint') ? 'active' : ''}`}
              >
                민원신청
              </Link>
            </nav>

            <div className="header-actions">
              {/* Search Form */}
              <form onSubmit={handleSearch} className="search-form">
                <label htmlFor="search-input" className="sr-only">
                  검색
                </label>
                <input
                  id="search-input"
                  type="search"
                  placeholder="검색어를 입력하세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  aria-label="검색어 입력"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="search-button"
                >
                  검색
                </Button>
              </form>

              {/* Login Button */}
              <Link to="/login">
                <Button variant="secondary" size="sm">
                  로그인
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="메뉴 열기"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="mobile-nav" aria-label="모바일 메뉴">
              <Link
                to="/"
                className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                홈
              </Link>
              <Link
                to="/notice"
                className={`mobile-nav-link ${isActive('/notice') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                공지사항
              </Link>
              <Link
                to="/civil-complaint"
                className={`mobile-nav-link ${isActive('/civil-complaint') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                민원신청
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-sitemap">
            <div className="sitemap-section">
              <h3>서비스</h3>
              <ul>
                <li>
                  <Link to="/notice">공지사항</Link>
                </li>
                <li>
                  <Link to="/civil-complaint">민원신청</Link>
                </li>
                <li>
                  <a href="#inquiry">민원조회</a>
                </li>
              </ul>
            </div>
            <div className="sitemap-section">
              <h3>안내</h3>
              <ul>
                <li>
                  <a href="#guide">이용안내</a>
                </li>
                <li>
                  <a href="#faq">자주묻는질문</a>
                </li>
                <li>
                  <a href="#contact">고객센터</a>
                </li>
              </ul>
            </div>
            <div className="sitemap-section">
              <h3>정책</h3>
              <ul>
                <li>
                  <a href="#privacy">개인정보처리방침</a>
                </li>
                <li>
                  <a href="#terms">이용약관</a>
                </li>
                <li>
                  <a href="#accessibility">웹접근성정책</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-info">
            <div className="footer-meta">
              <p className="copyright">
                Copyright 2025 민원포털. All rights reserved.
              </p>
              <p className="address">
                서울특별시 종로구 세종대로 209 | 대표전화: 02-1234-5678
              </p>
            </div>
            <div className="footer-certification">
              {/* Accessibility Mark Placeholder */}
              <div
                className="accessibility-mark"
                role="img"
                aria-label="웹접근성 품질인증 마크"
              >
                <span className="mark-badge">WA</span>
                <span className="mark-text">웹접근성</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
