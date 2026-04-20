/**
 * Settings Kit - Type Definitions
 * 사이트 설정 기능에 필요한 타입 정의
 */

// 사이트 기본 정보
export interface SiteInfo {
  name: string;
  description?: string;
  logoUrl?: string;
  faviconUrl?: string;
  phone?: string;
  email?: string;
  address?: string;
  postalCode?: string;
  copyright?: string;
}

// 계정 정보
export interface AdminAccount {
  id: number;
  username: string;
  name: string;
  email: string;
  role: AccountRole;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export type AccountRole = 'admin' | 'editor' | 'viewer';

// 계정 생성/수정 폼
export interface AccountFormData {
  username: string;
  name: string;
  email: string;
  role: AccountRole;
  password?: string;
}

// 메뉴 설정
export interface MenuConfig {
  id: number;
  name: string;
  url: string;
  parentId: number | null;
  order: number;
  isActive: boolean;
  children?: MenuConfig[];
}

// 배너 설정
export interface BannerConfig {
  id: number;
  title: string;
  type: 'banner' | 'popup';
  imageUrl?: string;
  linkUrl?: string;
  order: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

// 설정 API 응답
export interface SettingsResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
