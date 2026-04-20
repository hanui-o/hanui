/**
 * Settings Kit
 * 사이트 설정 기능 키트 - API 주소만 바꾸면 바로 사용 가능
 */

// Hooks
export {
  useSiteInfo,
  useUpdateSiteInfo,
  useAccounts,
  useCreateAccount,
  useUpdateAccount,
  useDeleteAccount,
  useMenus,
  useUpdateMenus,
  useBanners,
  useUpdateBanners,
  settingsKeys,
} from './hooks/useSettings';

// Store
export { useSettingsStore, useSettingsTab } from './store/settingsStore';

// API
export {
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
  api,
} from './api/settings';

// Types
export type {
  SiteInfo,
  AdminAccount,
  AccountRole,
  AccountFormData,
  MenuConfig,
  BannerConfig,
  SettingsResponse,
} from './types/settings';
