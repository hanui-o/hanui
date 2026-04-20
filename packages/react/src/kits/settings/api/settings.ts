/**
 * Settings Kit - API
 * 사이트 설정 CRUD API
 */

import axios from 'axios';
import type {
  SiteInfo,
  AdminAccount,
  AccountFormData,
  MenuConfig,
  BannerConfig,
  SettingsResponse,
} from '../types/settings';

export const api = axios.create({
  baseURL: '/api/settings',
  headers: { 'Content-Type': 'application/json' },
});

// 사이트 기본 정보
export async function getSiteInfo(): Promise<SiteInfo> {
  const { data } = await api.get<SettingsResponse<SiteInfo>>('/site');
  return data.data;
}

export async function updateSiteInfo(
  info: Partial<SiteInfo>
): Promise<SiteInfo> {
  const { data } = await api.put<SettingsResponse<SiteInfo>>('/site', info);
  return data.data;
}

// 계정 관리
export async function getAccounts(): Promise<AdminAccount[]> {
  const { data } = await api.get<SettingsResponse<AdminAccount[]>>('/accounts');
  return data.data;
}

export async function createAccount(
  form: AccountFormData
): Promise<AdminAccount> {
  const { data } = await api.post<SettingsResponse<AdminAccount>>(
    '/accounts',
    form
  );
  return data.data;
}

export async function updateAccount(
  id: number,
  form: Partial<AccountFormData>
): Promise<AdminAccount> {
  const { data } = await api.put<SettingsResponse<AdminAccount>>(
    `/accounts/${id}`,
    form
  );
  return data.data;
}

export async function deleteAccount(id: number): Promise<void> {
  await api.delete(`/accounts/${id}`);
}

// 메뉴 관리
export async function getMenus(): Promise<MenuConfig[]> {
  const { data } = await api.get<SettingsResponse<MenuConfig[]>>('/menus');
  return data.data;
}

export async function updateMenus(menus: MenuConfig[]): Promise<MenuConfig[]> {
  const { data } = await api.put<SettingsResponse<MenuConfig[]>>('/menus', {
    menus,
  });
  return data.data;
}

// 배너 관리
export async function getBanners(): Promise<BannerConfig[]> {
  const { data } = await api.get<SettingsResponse<BannerConfig[]>>('/banners');
  return data.data;
}

export async function updateBanners(
  banners: BannerConfig[]
): Promise<BannerConfig[]> {
  const { data } = await api.put<SettingsResponse<BannerConfig[]>>('/banners', {
    banners,
  });
  return data.data;
}
