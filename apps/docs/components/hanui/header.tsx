'use client';

import React from 'react';
import styles from './header.module.scss';
import { ChevronDown, Search, Menu, X } from 'lucide-react';

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className={`${styles.header} ${className || ''}`}>
      {/* Header Utility */}
      <div className={styles.headerUtility}>
        <div className={styles.inner}>
          <ul className={styles.utilityList}>
            <li>
              <button type="button" className={styles.utilityLink}>
                로그인
              </button>
            </li>
            <li>
              <button type="button" className={styles.utilityLink}>
                회원가입
              </button>
            </li>
            <li>
              <button type="button" className={styles.utilityLink}>
                ENGLISH
              </button>
            </li>
            <li>
              <button
                type="button"
                className={styles.utilityDropdownBtn}
                aria-haspopup="true"
                aria-expanded="false"
              >
                관련사이트
                <ChevronDown className={styles.dropdownIcon} />
              </button>
              <ul className={styles.utilityDropdown}>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="새 창 열기"
                  >
                    건강iN
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="새 창 열기"
                  >
                    The건강보험
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="새 창 열기"
                  >
                    요양기관업무포털
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="새 창 열기"
                  >
                    민원신청
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Header Branding */}
      <div className={styles.headerBranding}>
        <div className={styles.inner}>
          <h1 className={styles.logo}>
            <a href="/">
              <img
                src="https://www.krds.go.kr/resources/img/common/logo.svg"
                alt="국민건강보험"
              />
            </a>
          </h1>
          <span className={styles.slogan}>
            <span className={styles.srOnly}>슬로건</span>
          </span>

          {/* Header Actions */}
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.searchBtn}
              aria-label="검색"
            >
              <Search />
            </button>
            <button
              type="button"
              className={styles.menuBtn}
              aria-label="메뉴 열기"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Main Menu */}
      <nav className={styles.mainMenu} aria-label="주 메뉴">
        <div className={styles.inner}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <button type="button" className={styles.menuLink}>
                건강보험
                <ChevronDown className={styles.menuIcon} />
              </button>
              <div className={styles.subMenuWrapper}>
                <div className={styles.subMenuInner}>
                  <ul className={styles.subMenuList}>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        보험료
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        급여
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        요양기관
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        건강검진
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className={styles.menuItem}>
              <button type="button" className={styles.menuLink}>
                장기요양
                <ChevronDown className={styles.menuIcon} />
              </button>
              <div className={styles.subMenuWrapper}>
                <div className={styles.subMenuInner}>
                  <ul className={styles.subMenuList}>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        장기요양보험
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        장기요양인정
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        장기요양기관
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        장기요양급여
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className={styles.menuItem}>
              <button type="button" className={styles.menuLink}>
                민원·증명서
                <ChevronDown className={styles.menuIcon} />
              </button>
              <div className={styles.subMenuWrapper}>
                <div className={styles.subMenuInner}>
                  <ul className={styles.subMenuList}>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        민원신청
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        증명서발급
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        민원처리결과
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className={styles.menuItem}>
              <button type="button" className={styles.menuLink}>
                건강정보
                <ChevronDown className={styles.menuIcon} />
              </button>
              <div className={styles.subMenuWrapper}>
                <div className={styles.subMenuInner}>
                  <ul className={styles.subMenuList}>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        건강정보
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        질병정보
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        의학정보
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className={styles.menuItem}>
              <button type="button" className={styles.menuLink}>
                건강IN
                <ChevronDown className={styles.menuIcon} />
              </button>
              <div className={styles.subMenuWrapper}>
                <div className={styles.subMenuInner}>
                  <ul className={styles.subMenuList}>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        건강관리
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        건강검진
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        진료내역
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        약제비
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className={styles.menuItem}>
              <button type="button" className={styles.menuLink}>
                병원·약국
                <ChevronDown className={styles.menuIcon} />
              </button>
              <div className={styles.subMenuWrapper}>
                <div className={styles.subMenuInner}>
                  <ul className={styles.subMenuList}>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        병원찾기
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        약국찾기
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        응급실찾기
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className={styles.menuItem}>
              <button type="button" className={styles.menuLink}>
                소개
                <ChevronDown className={styles.menuIcon} />
              </button>
              <div className={styles.subMenuWrapper}>
                <div className={styles.subMenuInner}>
                  <ul className={styles.subMenuList}>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        공단소개
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        조직·업무
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        채용정보
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.subMenuLink}>
                        알림·소식
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Main Menu */}
      {isMobileMenuOpen && (
        <nav className={styles.mainMenuMobile} aria-label="모바일 메뉴">
          <div className={styles.mobileMenuInner}>
            <ul className={styles.mobileMenuList}>
              <li className={styles.mobileMenuItem}>
                <button type="button" className={styles.mobileMenuLink}>
                  건강보험
                  <ChevronDown className={styles.mobileMenuIcon} />
                </button>
                <ul className={styles.mobileSubMenuList}>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      보험료
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      급여
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      요양기관
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      건강검진
                    </a>
                  </li>
                </ul>
              </li>
              <li className={styles.mobileMenuItem}>
                <button type="button" className={styles.mobileMenuLink}>
                  장기요양
                  <ChevronDown className={styles.mobileMenuIcon} />
                </button>
                <ul className={styles.mobileSubMenuList}>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      장기요양보험
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      장기요양인정
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      장기요양기관
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      장기요양급여
                    </a>
                  </li>
                </ul>
              </li>
              <li className={styles.mobileMenuItem}>
                <button type="button" className={styles.mobileMenuLink}>
                  민원·증명서
                  <ChevronDown className={styles.mobileMenuIcon} />
                </button>
                <ul className={styles.mobileSubMenuList}>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      민원신청
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      증명서발급
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      민원처리결과
                    </a>
                  </li>
                </ul>
              </li>
              <li className={styles.mobileMenuItem}>
                <button type="button" className={styles.mobileMenuLink}>
                  건강정보
                  <ChevronDown className={styles.mobileMenuIcon} />
                </button>
                <ul className={styles.mobileSubMenuList}>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      건강정보
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      질병정보
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      의학정보
                    </a>
                  </li>
                </ul>
              </li>
              <li className={styles.mobileMenuItem}>
                <button type="button" className={styles.mobileMenuLink}>
                  건강IN
                  <ChevronDown className={styles.mobileMenuIcon} />
                </button>
                <ul className={styles.mobileSubMenuList}>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      건강관리
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      건강검진
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      진료내역
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      약제비
                    </a>
                  </li>
                </ul>
              </li>
              <li className={styles.mobileMenuItem}>
                <button type="button" className={styles.mobileMenuLink}>
                  병원·약국
                  <ChevronDown className={styles.mobileMenuIcon} />
                </button>
                <ul className={styles.mobileSubMenuList}>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      병원찾기
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      약국찾기
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      응급실찾기
                    </a>
                  </li>
                </ul>
              </li>
              <li className={styles.mobileMenuItem}>
                <button type="button" className={styles.mobileMenuLink}>
                  소개
                  <ChevronDown className={styles.mobileMenuIcon} />
                </button>
                <ul className={styles.mobileSubMenuList}>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      공단소개
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      조직·업무
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      채용정보
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles.mobileSubMenuLink}>
                      알림·소식
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Mobile Utility */}
            <div className={styles.mobileUtility}>
              <button type="button" className={styles.mobileUtilityBtn}>
                로그인
              </button>
              <button type="button" className={styles.mobileUtilityBtn}>
                회원가입
              </button>
              <button type="button" className={styles.mobileUtilityBtn}>
                ENGLISH
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
