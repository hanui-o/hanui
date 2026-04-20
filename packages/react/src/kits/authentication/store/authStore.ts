/**
 * Authentication Kit - Zustand Store
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '../types/auth';

interface AuthState {
  /** 현재 사용자 */
  user: AuthUser | null;
  /** 액세스 토큰 */
  accessToken: string | null;
  /** 리프레시 토큰 */
  refreshToken: string | null;
  /** 인증 여부 */
  isAuthenticated: boolean;

  /** 인증 정보 설정 */
  setAuth: (user: AuthUser, accessToken: string, refreshToken: string) => void;
  /** 인증 정보 초기화 */
  clearAuth: () => void;
  /** 토큰 갱신 */
  setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken, isAuthenticated: true }),

      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
    }),
    {
      name: 'hanui-auth',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

/** 현재 사용자 셀렉터 */
export const useCurrentAuthUser = () => useAuthStore((s) => s.user);

/** 인증 여부 셀렉터 */
export const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated);
