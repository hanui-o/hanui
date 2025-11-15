import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/react/src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        krona: ['var(--font-krona-one)'],
      },
      fontSize: {
        // KRDS Typography Scale - 모두 krds- 접두사 사용
        'krds-body-xs': ['13px', { lineHeight: '150%' }],
        'krds-body-sm': ['15px', { lineHeight: '150%' }],
        'krds-body-md': ['17px', { lineHeight: '150%' }], // 기본값
        'krds-body-lg': ['19px', { lineHeight: '150%' }],

        'krds-heading-xs': ['17px', { lineHeight: '150%', fontWeight: '700' }],
        'krds-heading-sm': ['19px', { lineHeight: '150%', fontWeight: '700' }],
        'krds-heading-md': ['24px', { lineHeight: '150%', fontWeight: '700' }],
        'krds-heading-lg': ['32px', { lineHeight: '150%', fontWeight: '700' }],
        'krds-heading-xl': ['40px', { lineHeight: '150%', fontWeight: '700' }],

        'krds-display-sm': ['36px', { lineHeight: '150%', fontWeight: '700' }],
        'krds-display-md': ['44px', { lineHeight: '150%', fontWeight: '700' }],
        'krds-display-lg': ['60px', { lineHeight: '150%', fontWeight: '700' }],

        // Override Tailwind default font sizes to KRDS
        base: ['17px', { lineHeight: '150%' }], // KRDS 기본 (기존 16px → 17px)
      },
      spacing: {
        // ⚠️ 주의: spacing은 숫자 키를 사용하므로 Tailwind 기본값과 겹칩니다
        // KRDS 전용 spacing은 별도로 정의하지 않고, Tailwind 기본값을 사용합니다
        // KRDS 8px grid는 Tailwind 기본 spacing과 호환됩니다:
        // - gap-2 = 8px (KRDS 기본 단위)
        // - gap-4 = 16px (KRDS 2배)
        // - gap-8 = 32px (KRDS 4배)
        //
        // KRDS 추가 spacing 값들 (Tailwind에 없는 값만 추가)
        '2.5': '10px', // gap-2.5 (KRDS 추가)
        '12': '48px', // gap-12 (KRDS 추가, Tailwind 기본값 48px와 동일)
        '20': '80px', // gap-20 (KRDS 추가)
      },
      colors: {
        // Base Colors - 순수 흰색/검은색 (모드 무관, 항상 동일)
        white: 'var(--color-white)',
        black: 'var(--color-black)',

        // KRDS Base Colors - 모드에 따라 반전
        'krds-white': {
          DEFAULT: 'var(--krds-white)', // 기본 모드: 흰색, 다크 모드: 검은색
        },
        'krds-black': {
          DEFAULT: 'var(--krds-black)', // 기본 모드: 검은색, 다크 모드: 흰색
        },

        // ⚠️ KRDS 컬러는 모두 `krds-*` 네임스페이스로 시작합니다
        // Tailwind 기본 컬러(gray, red, blue 등)와 공존하며 명확히 구분됩니다
        // 사용 예: bg-krds-primary-60, text-krds-gray-50, border-krds-danger-50

        // KRDS Primary Colors
        // 가이드라인:
        //   기본 모드: base=50, text=60, surface=5
        //   다크 모드: base=50, text=20, surface=95
        //   ✅ Semantic 변수 사용 권장: text-krds-primary-text (모드 자동 대응)
        'krds-primary': {
          // Semantic 변수 (모드에 따라 자동 변경)
          DEFAULT: 'var(--krds-primary-base)', // base (기본 모드: 50, 다크 모드: 50)
          text: 'var(--krds-primary-text)', // 기본 모드: 60, 다크 모드: 20
          surface: 'var(--krds-primary-surface)', // 기본 모드: 5, 다크 모드: 95
          base: 'var(--krds-primary-base)', // 기본 모드: 50, 다크 모드: 50
          // 숫자 스케일 (직접 사용 시)
          5: 'var(--krds-color-light-primary-5)', // surface
          10: 'var(--krds-color-light-primary-10)',
          20: 'var(--krds-color-light-primary-20)',
          30: 'var(--krds-color-light-primary-30)',
          40: 'var(--krds-color-light-primary-40)',
          50: 'var(--krds-color-light-primary-50)', // base
          60: 'var(--krds-color-light-primary-60)', // text
          70: 'var(--krds-color-light-primary-70)',
          80: 'var(--krds-color-light-primary-80)',
          90: 'var(--krds-color-light-primary-90)',
          95: 'var(--krds-color-light-primary-95)',
        },
        // KRDS Secondary Colors
        // 가이드라인:
        //   기본 모드: base=70, text=80, surface=5
        //   다크 모드: base=60, text=20, surface=95
        //   ✅ Semantic 변수 사용 권장: text-krds-secondary-text (모드 자동 대응)
        'krds-secondary': {
          DEFAULT: 'var(--krds-secondary-base)', // base (기본 모드: 70, 다크 모드: 60)
          // Semantic 변수 (모드에 따라 자동 변경)
          text: 'var(--krds-secondary-text)', // 기본 모드: 80, 다크 모드: 20
          surface: 'var(--krds-secondary-surface)', // 기본 모드: 5, 다크 모드: 95
          base: 'var(--krds-secondary-base)', // 기본 모드: 70, 다크 모드: 60
          // 숫자 스케일 (직접 사용 시)
          5: 'var(--krds-color-light-secondary-5)',
          10: 'var(--krds-color-light-secondary-10)',
          20: 'var(--krds-color-light-secondary-20)',
          30: 'var(--krds-color-light-secondary-30)',
          40: 'var(--krds-color-light-secondary-40)',
          50: 'var(--krds-color-light-secondary-50)',
          60: 'var(--krds-color-light-secondary-60)',
          70: 'var(--krds-color-light-secondary-70)',
          80: 'var(--krds-color-light-secondary-80)',
          90: 'var(--krds-color-light-secondary-90)',
          95: 'var(--krds-color-light-secondary-95)',
        },
        // KRDS Gray Scale
        // 가이드라인:
        //   0, 5, 10: background, surface
        //   40, 50: disabled
        //   70: subtle
        //   90: basic
        //   95: bolder
        'krds-gray': {
          0: 'var(--krds-color-light-gray-0)', // background, surface (white)
          5: 'var(--krds-color-light-gray-5)', // background, surface
          10: 'var(--krds-color-light-gray-10)', // background, surface
          20: 'var(--krds-color-light-gray-20)',
          30: 'var(--krds-color-light-gray-30)',
          40: 'var(--krds-color-light-gray-40)', // disabled
          50: 'var(--krds-color-light-gray-50)', // disabled
          60: 'var(--krds-color-light-gray-60)',
          70: 'var(--krds-color-light-gray-70)', // subtle
          80: 'var(--krds-color-light-gray-80)',
          90: 'var(--krds-color-light-gray-90)', // basic
          95: 'var(--krds-color-light-gray-95)', // bolder
          100: 'var(--krds-color-light-gray-100)', // black
        },
        // KRDS Accent Colors (강조 색상)
        // 가이드라인:
        //   기본 모드: surface=5, base=50, text=60
        //   선명한 화면 모드: surface=95, base=50, text=20
        //   ✅ Semantic 변수 사용 권장: text-krds-accent-text (모드 자동 대응)
        //   참고: 강조 색상은 5% 이하 비율로 제한적 사용
        'krds-accent': {
          DEFAULT: 'var(--krds-accent-base)', // base (모드 무관: 50)
          // Semantic 변수 (모드에 따라 자동 변경)
          text: 'var(--krds-accent-text)', // 기본 모드: 60, 선명한 화면 모드: 20
          surface: 'var(--krds-accent-surface)', // 기본 모드: 5, 선명한 화면 모드: 95
          base: 'var(--krds-accent-base)', // 모드 무관: 50
          // 숫자 스케일 (직접 사용 시)
          5: 'var(--krds-color-light-accent-5)',
          10: 'var(--krds-color-light-accent-10)',
          20: 'var(--krds-color-light-accent-20)',
          30: 'var(--krds-color-light-accent-30)',
          40: 'var(--krds-color-light-accent-40)',
          50: 'var(--krds-color-light-accent-50)', // base
          60: 'var(--krds-color-light-accent-60)',
          70: 'var(--krds-color-light-accent-70)',
          80: 'var(--krds-color-light-accent-80)',
          90: 'var(--krds-color-light-accent-90)',
          95: 'var(--krds-color-light-accent-95)',
        },
        // KRDS Danger Colors (위험/에러 색상)
        // 가이드라인:
        //   기본 모드: 아이콘=50, 텍스트=60, 배경=5, 보더=10
        //   선명한 화면 모드: 아이콘=20, 텍스트=20, 배경=95, 보더=90
        //   ✅ Semantic 변수 사용 권장: text-krds-danger-text (모드 자동 대응)
        'krds-danger': {
          DEFAULT: 'var(--krds-danger-base)', // base (모드 무관: 50)
          // Semantic 변수 (모드에 따라 자동 변경)
          icon: 'var(--krds-danger-icon)', // 기본 모드: 50, 선명한 화면 모드: 20
          text: 'var(--krds-danger-text)', // 기본 모드: 60, 선명한 화면 모드: 20
          surface: 'var(--krds-danger-surface)', // 기본 모드: 5, 선명한 화면 모드: 95
          base: 'var(--krds-danger-base)', // 모드 무관: 50
          border: 'var(--krds-danger-border)', // 기본 모드: 10, 선명한 화면 모드: 90
          // 숫자 스케일 (직접 사용 시)
          5: 'var(--krds-color-light-danger-5)',
          10: 'var(--krds-color-light-danger-10)',
          20: 'var(--krds-color-light-danger-20)',
          30: 'var(--krds-color-light-danger-30)',
          40: 'var(--krds-color-light-danger-40)',
          50: 'var(--krds-color-light-danger-50)', // base
          60: 'var(--krds-color-light-danger-60)',
          70: 'var(--krds-color-light-danger-70)',
          80: 'var(--krds-color-light-danger-80)',
          90: 'var(--krds-color-light-danger-90)',
          95: 'var(--krds-color-light-danger-95)',
        },
        // KRDS Warning Colors (주의 색상)
        // 가이드라인:
        //   기본 모드: 아이콘=50, 텍스트=60, 배경=5, 보더=10
        //   선명한 화면 모드: 아이콘=20, 텍스트=20, 배경=95, 보더=90
        //   ✅ Semantic 변수 사용 권장: text-krds-warning-text (모드 자동 대응)
        'krds-warning': {
          DEFAULT: 'var(--krds-warning-base)', // base (모드 무관: 30)
          // Semantic 변수 (모드에 따라 자동 변경)
          icon: 'var(--krds-warning-icon)', // 기본 모드: 50, 선명한 화면 모드: 20
          text: 'var(--krds-warning-text)', // 기본 모드: 60, 선명한 화면 모드: 20
          surface: 'var(--krds-warning-surface)', // 기본 모드: 5, 선명한 화면 모드: 95
          base: 'var(--krds-warning-base)', // 모드 무관: 30
          border: 'var(--krds-warning-border)', // 기본 모드: 10, 선명한 화면 모드: 90
          // 숫자 스케일 (직접 사용 시)
          5: 'var(--krds-color-light-warning-5)',
          10: 'var(--krds-color-light-warning-10)',
          20: 'var(--krds-color-light-warning-20)',
          30: 'var(--krds-color-light-warning-30)', // base
          40: 'var(--krds-color-light-warning-40)',
          50: 'var(--krds-color-light-warning-50)',
          60: 'var(--krds-color-light-warning-60)',
          70: 'var(--krds-color-light-warning-70)',
          80: 'var(--krds-color-light-warning-80)',
          90: 'var(--krds-color-light-warning-90)',
          95: 'var(--krds-color-light-warning-95)',
        },
        // KRDS Success Colors (성공 색상)
        // 가이드라인:
        //   기본 모드: 아이콘=50, 텍스트=60, 배경=5, 보더=10
        //   선명한 화면 모드: 아이콘=20, 텍스트=20, 배경=95, 보더=90
        //   ✅ Semantic 변수 사용 권장: text-krds-success-text (모드 자동 대응)
        'krds-success': {
          DEFAULT: 'var(--krds-success-base)', // base (모드 무관: 50)
          // Semantic 변수 (모드에 따라 자동 변경)
          icon: 'var(--krds-success-icon)', // 기본 모드: 50, 선명한 화면 모드: 20
          text: 'var(--krds-success-text)', // 기본 모드: 60, 선명한 화면 모드: 20
          surface: 'var(--krds-success-surface)', // 기본 모드: 5, 선명한 화면 모드: 95
          base: 'var(--krds-success-base)', // 모드 무관: 50
          border: 'var(--krds-success-border)', // 기본 모드: 10, 선명한 화면 모드: 90
          // 숫자 스케일 (직접 사용 시)
          5: 'var(--krds-color-light-success-5)',
          10: 'var(--krds-color-light-success-10)',
          20: 'var(--krds-color-light-success-20)',
          30: 'var(--krds-color-light-success-30)',
          40: 'var(--krds-color-light-success-40)',
          50: 'var(--krds-color-light-success-50)', // base
          60: 'var(--krds-color-light-success-60)',
          70: 'var(--krds-color-light-success-70)',
          80: 'var(--krds-color-light-success-80)',
          90: 'var(--krds-color-light-success-90)',
          95: 'var(--krds-color-light-success-95)',
        },
        // KRDS Information Colors (안내 색상)
        // 가이드라인:
        //   기본 모드: 아이콘=50, 텍스트=60, 배경=5, 보더=10
        //   선명한 화면 모드: 아이콘=20, 텍스트=20, 배경=95, 보더=90
        //   ✅ Semantic 변수 사용 권장: text-krds-information-text (모드 자동 대응)
        'krds-information': {
          DEFAULT: 'var(--krds-information-base)', // base (모드 무관: 50)
          // Semantic 변수 (모드에 따라 자동 변경)
          icon: 'var(--krds-information-icon)', // 기본 모드: 50, 선명한 화면 모드: 20
          text: 'var(--krds-information-text)', // 기본 모드: 60, 선명한 화면 모드: 20
          surface: 'var(--krds-information-surface)', // 기본 모드: 5, 선명한 화면 모드: 95
          base: 'var(--krds-information-base)', // 모드 무관: 50
          border: 'var(--krds-information-border)', // 기본 모드: 10, 선명한 화면 모드: 90
          // 숫자 스케일 (직접 사용 시)
          5: 'var(--krds-color-light-information-5)',
          10: 'var(--krds-color-light-information-10)',
          20: 'var(--krds-color-light-information-20)',
          30: 'var(--krds-color-light-information-30)',
          40: 'var(--krds-color-light-information-40)',
          50: 'var(--krds-color-light-information-50)', // base
          60: 'var(--krds-color-light-information-60)',
          70: 'var(--krds-color-light-information-70)',
          80: 'var(--krds-color-light-information-80)',
          90: 'var(--krds-color-light-information-90)',
          95: 'var(--krds-color-light-information-95)',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
};

export default config;
