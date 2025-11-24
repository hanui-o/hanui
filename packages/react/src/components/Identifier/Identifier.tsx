'use client';

import React from 'react';
import styles from './identifier.module.scss';

export interface IdentifierProps {
  /**
   * 운영 기관 이름 (필수)
   */
  organizationName: string;

  /**
   * 기관 로고 (이미지 URL 또는 React 엘리먼트)
   */
  logo?: string | React.ReactNode;

  /**
   * 로고 alt 텍스트 (logo가 string일 때 필수)
   */
  logoAlt?: string;

  /**
   * 시각적 테마 변형
   * @default 'light'
   */
  variant?: 'light' | 'dark';

  /**
   * 커스텀 텍스트 ({organization} 플레이스홀더 사용 가능)
   * @default "이 누리집은 {organization} 누리집입니다."
   */
  text?: string;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

export function Identifier({
  organizationName,
  logo,
  logoAlt,
  variant = 'light',
  text = '이 누리집은 {organization} 누리집입니다.',
  className,
}: IdentifierProps) {
  // logo가 string이고 logoAlt가 없으면 경고
  if (typeof logo === 'string' && !logoAlt) {
    console.warn(
      'Identifier: logoAlt prop is required when logo is a string URL for accessibility.'
    );
  }

  // {organization} 플레이스홀더를 organizationName으로 치환
  const displayText = text.replace('{organization}', organizationName);

  const variantClass = variant === 'dark' ? styles.dark : '';

  return (
    <div
      className={`${styles.identifier} ${variantClass} ${className || ''} krds-identifier`}
    >
      {logo && (
        <span className={styles.logo}>
          {typeof logo === 'string' ? (
            <img src={logo} alt={logoAlt || ''} loading="lazy" />
          ) : (
            logo
          )}
        </span>
      )}
      <span className={styles.text}>{displayText}</span>
    </div>
  );
}
