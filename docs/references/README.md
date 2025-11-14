# 접근성 참조 문서

> HANUI 개발 시 참조하는 접근성 표준 및 가이드라인 모음

---

## 📁 폴더 구조

```
docs/references/
├── README.md (이 파일)
├── krds/
│   ├── README.md (KRDS 개요)
│   ├── 01-digital-inclusion.md (디지털 포용 원칙)
│   ├── 02-layout.md (레이아웃 가이드)
│   ├── 03-color-contrast.md (색상 및 명도 대비)
│   ├── 04-typography.md (타이포그래피)
│   ├── 05-navigation.md (네비게이션 접근성)
│   ├── 06-interactive.md (상호작용 요소)
│   ├── 07-forms.md (폼 접근성)
│   ├── 08-media.md (이미지 및 미디어)
│   └── checklist.md (접근성 체크리스트)
└── wcag/
    └── README.md (WCAG 2.2 개요 - 추후 추가)
```

---

## 📖 문서 개요

### KRDS (한국형 웹 콘텐츠 디자인 시스템)

KRDS는 대한민국 정부 웹사이트의 접근성 표준을 제시하는 공식 디자인 시스템입니다.

**준수 기준:**

- KWCAG 2.2 (한국형 웹 콘텐츠 접근성 지침 2.2)
- 전자정부 웹사이트 품질관리 지침
- WCAG 2.1 (국제 표준)

**핵심 원칙:**

> "모든 사용자가 동등하게 이용할 수 있는 디지털 정부 서비스"

---

## 🎯 활용 방법

### 1. 컴포넌트 개발 시

```markdown
1. 해당 컴포넌트 카테고리의 가이드 문서 확인
   예: Button → 06-interactive.md

2. 체크리스트 항목 준수 확인
   → checklist.md

3. 코드 구현 시 각 항목 체크
```

### 2. 블로그 글 작성 시

```markdown
1. 주제 관련 KRDS 가이드 문서 참조
   예: Modal 접근성 → 06-interactive.md, 05-navigation.md

2. 정확한 기준 인용
   - KWCAG 2.2 기준 번호
   - WCAG 2.1 기준 번호

3. 실제 코드 예시 작성
```

### 3. Inspector 개발 시

```markdown
1. 검증 규칙 구현 시 참조
   → checklist.md의 각 항목을 검증 규칙으로 변환

2. 오류 메시지 작성
   → 각 가이드 문서의 "문제점" 섹션 참조

3. 자동 수정 제안
   → 각 가이드 문서의 "해결 방법" 섹션 참조
```

---

## 📚 주요 문서

| 문서                                     | 설명                            | 주요 내용                |
| ---------------------------------------- | ------------------------------- | ------------------------ |
| [KRDS 개요](./krds/README.md)            | KRDS 전체 구조 및 원칙          | 디지털 포용, 준수 기준   |
| [레이아웃](./krds/02-layout.md)          | 그리드, 간격, 반응형 레이아웃   | 브레이크포인트, 간격체계 |
| [색상 대비](./krds/03-color-contrast.md) | 명도 대비 기준                  | 4.5:1, 3:1 기준          |
| [네비게이션](./krds/05-navigation.md)    | 건너뛰기 링크, 메뉴, 브레드크럼 | 키보드 탐색, 구조화      |
| [상호작용](./krds/06-interactive.md)     | 버튼, 링크, 키보드 접근성       | 초점 관리, 키보드 트랩   |
| [폼](./krds/07-forms.md)                 | 입력 필드, 레이블, 오류 처리    | 필수 항목, 자동완성      |
| [미디어](./krds/08-media.md)             | 이미지, 비디오, 자막            | 대체 텍스트, 자동재생    |
| [체크리스트](./krds/checklist.md)        | 전체 접근성 검증 항목           | 30+ 검사 항목            |

---

## 🔗 외부 참조

### 공식 사이트

- [KRDS 공식](https://www.krds.go.kr)
- [웹 접근성 연구소](https://www.wah.or.kr)
- [W3C WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

### 관련 문서

- [HANUI 접근성 구현 전략](../strategy/opensource/A11Y_IMPLEMENTATION.md)
- [Inspector MVP 구성](../strategy/saas/MVP_AI_AND_BRANDING.md)
- [블로그 콘텐츠 전략](../blog/README.md)

---

## 📝 문서 업데이트

| 날짜       | 내용                        | 작성자   |
| ---------- | --------------------------- | -------- |
| 2025-11-14 | 초기 문서 구조 및 KRDS 정리 | HANUI 팀 |

---

**관리:** HANUI 개발팀
**최종 업데이트:** 2025-11-14
