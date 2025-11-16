# HANUI 기술 블로그

> A11y Deep Dive 시리즈 - 접근성 자동화의 모든 것

---

## 📁 폴더 구조

```
docs/blog/
├── README.md          (이 파일)
├── ko/                # 한글 블로그 (Velog, NAVER)
│   └── 2025-01/
│       └── 001-button-a11y.md
└── en/                # 영문 블로그 (Dev.to, Medium)
    └── 2025-01/
        └── 001-button-a11y.md
```

---

## 🎯 블로그 전략

### 발행 채널

**한글 (ko/)**:

- Velog (@hanui)
- NAVER 블로그 (SEO 최적화)

**영문 (en/)**:

- Dev.to (@hanui)
- Medium (영문 번역 버전)

---

## 📝 콘텐츠 시리즈

### A11y Deep Dive 시리즈

| #   | 주제                          | 한글 | 영문 | 상태    |
| --- | ----------------------------- | ---- | ---- | ------- |
| 001 | Button 접근성 완벽 가이드     |      | ⏳   | 작성 중 |
| 002 | Modal 접근성의 6가지 함정     | ⏳   | ⏳   | 예정    |
| 003 | Select/Combobox의 ARIA 구조   | ⏳   | ⏳   | 예정    |
| 004 | Form 접근성 체크리스트        | ⏳   | ⏳   | 예정    |
| 005 | Dialog Focus Trap 구현        | ⏳   | ⏳   | 예정    |
| 006 | 키보드 네비게이션 패턴        | ⏳   | ⏳   | 예정    |
| 007 | ARIA Live Region 활용법       | ⏳   | ⏳   | 예정    |
| 008 | 색상 대비(Contrast) 자동 검증 | ⏳   | ⏳   | 예정    |
| 009 | 스크린 리더 최적화 가이드     | ⏳   | ⏳   | 예정    |
| 010 | WCAG 2.2 vs KRDS 비교         | ⏳   | ⏳   | 예정    |

---

## 📅 발행 계획

### 1-3월 (Phase 1)

- 주 1회 발행 (매주 월요일)
- 한글 우선 작성 → 영문 번역

### 4-6월 (Phase 2)

- 주 2회 발행 (월요일, 목요일)
- 영문 동시 발행

### 7-9월 (Phase 3)

- 심화 시리즈 시작
- TechCrunch, NAVER D2 기고

---

## ✍️ 작성 가이드

### 파일명 규칙

```
YYYY-MM/NNN-topic-name.md

예시:
- 2025-01/001-button-a11y.md
- 2025-01/002-modal-focus-trap.md
```

### 필수 포함 항목

1. **잘못된 예시** (❌)
2. **올바른 예시** (✅)
3. **HANUI 컴포넌트 해결 방법**
4. **WCAG/KRDS 기준 설명**
5. **실제 코드 예제**

### 글 구조

```markdown
# [주제]

## 문제 상황

## WCAG/KRDS 기준

## 잘못된 구현 (❌)

## 올바른 구현 (⚠️)

## HANUI 자동화 솔루션 (✅)

## 마무리
```

---

## 🔗 관련 문서

- [콘텐츠 전략](../strategy/saas/MVP_AI_AND_BRANDING.md#q4-브랜드-신뢰도-확보-콘텐츠-전략)
- [HANUI 접근성 구현 전략](../strategy/opensource/A11Y_IMPLEMENTATION.md)

---

**작성일**: 2025-11-14
**관리**: HANUI 콘텐츠팀
