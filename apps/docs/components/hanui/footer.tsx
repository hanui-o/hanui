'use client';

import React from 'react';
import styles from './footer.module.scss';
import { ChevronRight } from 'lucide-react';

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer id="krds-footer" className={`${styles.footer} ${className || ''}`}>
      <div className={styles.footQuick}>
        <div className={styles.inner}>
          <button
            type="button"
            className={styles.link}
            title="related_site 레이어"
          >
            related_site
          </button>
          <button
            type="button"
            className={styles.link}
            title="related_site 레이어"
          >
            related_site
          </button>
          <button
            type="button"
            className={styles.link}
            title="related_site 레이어"
          >
            related_site
          </button>
          <button
            type="button"
            className={styles.link}
            title="related_site 레이어"
          >
            related_site
          </button>
        </div>
      </div>
      <div className={styles.inner}>
        <div className={styles.fLogo}>
          <span className={styles.srOnly}>KRDS - Korea Design System</span>
        </div>
        <div className={styles.fCnt}>
          <div className={styles.fInfo}>
            <p className={styles.infoAddr}>
              (26464) 강원특별자치도 원주시 건강로 32(반곡동) 국민건강보험공단
            </p>
            <ul className={styles.infoCs}>
              <li>
                <strong className={styles.strong}>대표전화 1577-1000</strong>
                <span className={styles.span}>(유료, 평일 09시~18시)</span>
              </li>
              <li>
                <strong className={styles.strong}>
                  해외이용 82-33-811-2001
                </strong>
                <span className={styles.span}>(유료, 평일 09시~18시)</span>
              </li>
            </ul>
          </div>

          <div className={styles.fLink}>
            <div className={styles.linkGo}>
              <a href="#" className={styles.linkGoBtn}>
                찾아오시는 길 <ChevronRight />
              </a>
              <a href="#" className={styles.linkGoBtn}>
                이용안내 <ChevronRight />
              </a>
              <a href="#" className={styles.linkGoBtn}>
                직원검색 <ChevronRight />
              </a>
            </div>
            <div className={styles.linkSns}>
              <a
                href="#"
                className={styles.snsLink}
                target="_blank"
                rel="noopener noreferrer"
                title="새 창 열기"
              >
                <span className={styles.srOnly}>인스타그램</span>
                <i className="svg-icon ico-instagram"></i>
              </a>
              <a
                href="#"
                className={styles.snsLink}
                target="_blank"
                rel="noopener noreferrer"
                title="새 창 열기"
              >
                <span className={styles.srOnly}>유튜브</span>
                <i className="svg-icon ico-youtube"></i>
              </a>
              <a
                href="#"
                className={styles.snsLink}
                target="_blank"
                rel="noopener noreferrer"
                title="새 창 열기"
              >
                <span className={styles.srOnly}>X</span>
                <i className="svg-icon ico-sns-x"></i>
              </a>
              <a
                href="#"
                className={styles.snsLink}
                target="_blank"
                rel="noopener noreferrer"
                title="새 창 열기"
              >
                <span className={styles.srOnly}>페이스북</span>
                <i className="svg-icon ico-facebook"></i>
              </a>
              <a
                href="#"
                className={styles.snsLink}
                target="_blank"
                rel="noopener noreferrer"
                title="새 창 열기"
              >
                <span className={styles.srOnly}>블로그</span>
                <i className="svg-icon ico-blog"></i>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.fBtm}>
          <div className={styles.fBtmText}>
            <div className={styles.fMenu}>
              <a href="#" className={styles.point}>
                개인정보처리방침
              </a>
              <a href="#">저작권 정책</a>
              <a href="#">웹 접근성 품질인증 마크 획득</a>
            </div>
            <p className={styles.fCopy}>
              © 2023 National Health Insurance Service. All rights reserved.
            </p>
          </div>
          <div className={styles.krdsIdentifier}>
            <span className={styles.logo}>
              <span className={styles.srOnly}>KRDS - Korea Design System</span>
            </span>
            <span className={styles.banTxt}>
              이 누리집은 보건복지부 누리집입니다.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
