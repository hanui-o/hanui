'use client';

import React from 'react';
import styles from './header.module.scss';

export interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function Header({ children, className }: HeaderProps) {
  return (
    <header className={`${styles.header} ${className || ''}`}>
      <div className={styles.headerIn}>{children}</div>
    </header>
  );
}

// Header 하위 컴포넌트들
Header.Utility = function HeaderUtility({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.headerUtility}>
      <ul className={styles.utilityList}>{children}</ul>
    </div>
  );
};

Header.Branding = function HeaderBranding({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.headerBranding}>{children}</div>;
};

Header.Logo = function HeaderLogo({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href?: string;
}) {
  const logo = <img src={src} alt={alt} className={styles.logo} />;

  return href ? <a href={href}>{logo}</a> : logo;
};

Header.Slogan = function HeaderSlogan({
  children,
}: {
  children: React.ReactNode;
}) {
  return <span className={styles.slogan}>{children}</span>;
};

Header.UtilityLink = function HeaderUtilityLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a href={href} className={styles.utilityLink}>
        {children}
      </a>
    </li>
  );
};
