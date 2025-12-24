// Auth Kit - API
// 인증 API 호출 함수

import axios from 'axios';
import type {
  User,
  LoginInput,
  LoginResponse,
  SignupInput,
  ResetPasswordInput,
  ResetPasswordConfirmInput,
  ChangePasswordInput,
  UpdateProfileInput,
} from '../types/auth';

// API 기본 URL - 실제 서버 주소로 변경하세요
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 저장/가져오기 유틸리티
export const tokenStorage = {
  getAccessToken: () =>
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
  getRefreshToken: () =>
    typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null,
  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};

// 인터셉터: 인증 토큰 추가
apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 인터셉터: 토큰 갱신
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = tokenStorage.getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post<LoginResponse>(
            `${API_URL}/auth/refresh`,
            { refreshToken }
          );
          tokenStorage.setTokens(
            response.data.accessToken,
            response.data.refreshToken
          );
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return apiClient(originalRequest);
        } catch {
          tokenStorage.clearTokens();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// 로그인
export async function login(data: LoginInput): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', data);
  tokenStorage.setTokens(response.data.accessToken, response.data.refreshToken);
  return response.data;
}

// 회원가입
export async function signup(data: SignupInput): Promise<User> {
  const response = await apiClient.post<User>('/auth/signup', data);
  return response.data;
}

// 로그아웃
export async function logout(): Promise<void> {
  try {
    await apiClient.post('/auth/logout');
  } finally {
    tokenStorage.clearTokens();
  }
}

// 현재 사용자 정보 조회
export async function getMe(): Promise<User> {
  const response = await apiClient.get<User>('/auth/me');
  return response.data;
}

// 비밀번호 재설정 이메일 요청
export async function requestPasswordReset(
  data: ResetPasswordInput
): Promise<void> {
  await apiClient.post('/auth/password/reset', data);
}

// 비밀번호 재설정 확인
export async function confirmPasswordReset(
  data: ResetPasswordConfirmInput
): Promise<void> {
  await apiClient.post('/auth/password/reset/confirm', data);
}

// 비밀번호 변경
export async function changePassword(data: ChangePasswordInput): Promise<void> {
  await apiClient.post('/auth/password/change', data);
}

// 프로필 업데이트
export async function updateProfile(data: UpdateProfileInput): Promise<User> {
  const response = await apiClient.patch<User>('/auth/profile', data);
  return response.data;
}

// 이메일 중복 확인
export async function checkEmailExists(email: string): Promise<boolean> {
  const response = await apiClient.get<{ exists: boolean }>(
    '/auth/check-email',
    {
      params: { email },
    }
  );
  return response.data.exists;
}
