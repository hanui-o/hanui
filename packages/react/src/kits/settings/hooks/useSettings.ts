/**
 * Settings Kit - React Query Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSiteInfo,
  updateSiteInfo,
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  getMenus,
  updateMenus,
  getBanners,
  updateBanners,
} from '../api/settings';
import type {
  AccountFormData,
  SiteInfo,
  MenuConfig,
  BannerConfig,
} from '../types/settings';

export const settingsKeys = {
  all: ['settings'] as const,
  site: () => [...settingsKeys.all, 'site'] as const,
  accounts: () => [...settingsKeys.all, 'accounts'] as const,
  menus: () => [...settingsKeys.all, 'menus'] as const,
  banners: () => [...settingsKeys.all, 'banners'] as const,
};

// 사이트 정보
export function useSiteInfo() {
  return useQuery({
    queryKey: settingsKeys.site(),
    queryFn: getSiteInfo,
  });
}

export function useUpdateSiteInfo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (info: Partial<SiteInfo>) => updateSiteInfo(info),
    onSuccess: () => qc.invalidateQueries({ queryKey: settingsKeys.site() }),
  });
}

// 계정 관리
export function useAccounts() {
  return useQuery({
    queryKey: settingsKeys.accounts(),
    queryFn: getAccounts,
  });
}

export function useCreateAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: AccountFormData) => createAccount(form),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: settingsKeys.accounts() }),
  });
}

export function useUpdateAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      form,
    }: {
      id: number;
      form: Partial<AccountFormData>;
    }) => updateAccount(id, form),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: settingsKeys.accounts() }),
  });
}

export function useDeleteAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteAccount(id),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: settingsKeys.accounts() }),
  });
}

// 메뉴 관리
export function useMenus() {
  return useQuery({
    queryKey: settingsKeys.menus(),
    queryFn: getMenus,
  });
}

export function useUpdateMenus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (menus: MenuConfig[]) => updateMenus(menus),
    onSuccess: () => qc.invalidateQueries({ queryKey: settingsKeys.menus() }),
  });
}

// 배너 관리
export function useBanners() {
  return useQuery({
    queryKey: settingsKeys.banners(),
    queryFn: getBanners,
  });
}

export function useUpdateBanners() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (banners: BannerConfig[]) => updateBanners(banners),
    onSuccess: () => qc.invalidateQueries({ queryKey: settingsKeys.banners() }),
  });
}
