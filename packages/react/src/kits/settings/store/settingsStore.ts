/**
 * Settings Kit - Zustand Store
 */

import { create } from 'zustand';

interface SettingsState {
  /** 현재 활성 탭 */
  activeTab: 'site' | 'accounts' | 'menus' | 'banners' | 'trash';
  /** 계정 편집 모달 대상 ID */
  editingAccountId: number | null;
  /** 계정 삭제 모달 대상 ID */
  deletingAccountId: number | null;

  setActiveTab: (tab: SettingsState['activeTab']) => void;
  setEditingAccountId: (id: number | null) => void;
  setDeletingAccountId: (id: number | null) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  activeTab: 'site',
  editingAccountId: null,
  deletingAccountId: null,

  setActiveTab: (activeTab) => set({ activeTab }),
  setEditingAccountId: (editingAccountId) => set({ editingAccountId }),
  setDeletingAccountId: (deletingAccountId) => set({ deletingAccountId }),
}));

export const useSettingsTab = () => useSettingsStore((s) => s.activeTab);
