# HANUI - 전략적 결정사항 요약

> **프로젝트 시작 전 핵심 결정 완료**
> 작성일: 2025-01-08

---

## 최종 결정사항

### 0. 디자인 레퍼런스: KRDS + Vercel

```
선택: KRDS 공식 규격 (1순위) + Vercel 스타일 (2순위)

이유:
✓ KRDS는 공식 표준 (법적 효력)
✓ Vercel은 표현 방식 (미니멀, 세련)
✓ "KRDS 규격 안에서 Vercel처럼 세련되게"

실행:
- 컬러, 폰트, 크기, 간격 = KRDS 100% 준수
- 레이아웃, 애니메이션 = Vercel 스타일 차용
- 충돌 시 항상 KRDS 우선

레퍼런스:
- KRDS: https://www.krds.go.kr/
- Vercel: https://vercel.com/
- 상세: docs/design/DESIGN_REFERENCE.md
```

---

### 1. 개발 우선순위: Starter Kit 우선

```
선택: 옵션 A - Starter Kit 먼저, 문서는 점진적으로

이유:
✓ 1개월 내 실사용 가능
✓ 빠른 피드백 수집
✓ 실제 사용 사례 기반 문서 작성 가능
✓ 초기 adopter는 문서 없어도 사용

실행:
Week 1-2: 컴포넌트 9개
Week 3-4: CLI + 템플릿 2개 (Portal + Admin)
Week 5: 배포
```

---

### 2. 프레임워크: React 먼저

```
선택: 옵션 A - React 우선, Vue는 Month 2-3 추가

이유:
✓ 시장 점유율 60% (Vue 30%)
✓ 참고 자료 풍부
✓ Next.js로 Docs 통일
✓ 생태계 크고 채용 쉬움

로드맵:
Month 1-2: React 라이브러리 + Docs
Month 2-3: Vue 추가
```

---

### 3. 템플릿 전략: Portal + Admin ⭐ 핵심 차별화

```
선택: 기존 "Basic, Dashboard, Form" 대신
      → "Portal (Next.js), Admin (React + Vite)" 2개

이유:
✓ 공공 프로젝트 필수 구성: 포털 + 어드민
✓ 경쟁사 대비 압도적 차별화
✓ 실무 즉시 사용 가능
✓ 개발 시간 2주 → 2일 단축

템플릿 구성:
1. Portal (Next.js)
   - 대국민 포털 사이트
   - 공지사항, 자료실, 민원 신청
   - SEO, 접근성 최적화

2. Admin (React + Vite)
   - 내부 관리자 시스템
   - 대시보드, CRUD, 권한 관리
   - 빠른 개발 환경 (Vite)

3. Both (Monorepo)
   - 포털 + 어드민 통합
   - 공통 컴포넌트 공유
```

---

### 4. 컴포넌트: 9개 (공공 필수)

```
P0 컴포넌트 (반드시 포함):
1. Button        - 기본 UI
2. Input         - 폼
3. Table         - 게시판 필수
4. Pagination    - 게시판 필수
5. Breadcrumb    - 포털 필수
6. FileUpload    - 민원/자료실 필수
7. Select        - 폼 필수
8. Card          - 레이아웃
9. Modal         - 다이얼로그

→ 공공 프로젝트 실무 커버율 90%+
```

---

## 🏗️ 프로젝트 구조

```
hanui/
├── packages/
│   ├── core/              # @hanui/core
│   ├── react/             # @hanui/react (9개 컴포넌트)
│   ├── vue/               # @hanui/vue (Phase 1.5)
│   └── cli/               # create-hanui-app
├── apps/
│   ├── docs/              # 문서 사이트 (Next.js)
│   └── playground/        # 테스트 앱
├── templates/
│   ├── portal/            # Next.js 포털 템플릿 ⭐
│   ├── admin/             # React + Vite 어드민 템플릿 ⭐
│   └── monorepo-template/ # Both 선택 시
└── docs/                  # 기획 문서

도구: Turborepo + pnpm
```

---

## 📅 타임라인

```
Week 1 (5일): 프로젝트 설정 + Button, Input
Week 2 (5일): Table, Pagination, Breadcrumb, FileUpload, Select
Week 2.5 (3일): Card, Modal
Week 3 (5일): CLI + Portal 템플릿
Week 4 (5일): Admin 템플릿 + Docs 기본
Week 5 (5일): 테스트 + 배포

총 5주 (풀타임)
또는 8-10주 (파트타임)
```

---

## 🎯 Phase 1 목표

### v0.1.0 배포 시 포함 사항:

```
@hanui/react (9개 컴포넌트)
create-hanui-app CLI
Portal 템플릿 (Next.js)
Admin 템플릿 (React + Vite)
Docs 사이트 기본
README + Quick Start
NPM 배포
```

### 배포 후 측정 지표:

```
1개월 내:
- NPM 다운로드: 100+/주
- GitHub Stars: 50+
- 실사용 프로젝트: 3개+
- Discord: 20명+

3개월 내:
- NPM 다운로드: 500+/주
- GitHub Stars: 200+
- 실사용 프로젝트: 10개+
- Discord: 100명+
```

---

## 🚀 핵심 차별화 포인트

### 경쟁사 vs HANUI

| 항목          | 경쟁사         | HANUI             |
| ------------- | -------------- | ----------------- |
| **제공 범위** | 컴포넌트만     | 컴포넌트 + 템플릿 |
| **템플릿**    | 없음           | Portal + Admin    |
| **실무 사용** | 직접 구성 필요 | 즉시 사용 가능    |
| **개발 시간** | 2주            | 2일               |
| **접근성**    | 부분적         | KRDS 완전 준수    |
| **공공 특화** | 없음           | 100% 특화         |

---

## 💬 마케팅 메시지

### Before (문제):

```
"공공 프로젝트 시작할 때마다..."
- KRDS 컴포넌트 직접 구현 (2주)
- 포털 + 어드민 구조 직접 세팅
- 접근성 검수 실패 (500만원 추가)
- 매번 같은 일 반복
```

### After (솔루션):

```
"npx create-hanui-app 한 번이면"
✓ 포털 + 어드민 30초 만에 생성
✓ KRDS 컴포넌트 9개 기본 탑재
✓ 접근성 AA 등급 자동 준수
✓ 바로 개발 시작 가능

→ 개발 시간 1/10, 비용 1/10
```

---

## 📝 다음 단계

### 지금 바로:

1. 전략 결정 확정 (완료)
2. ⏳ GitHub Issues 생성 (다음)
3. ⏳ Week 1 Day 1 시작

### Issue 생성 순서:

```
1. Epic별로 생성 (Epic 1 → Epic 2 → ...)
2. P0 이슈 우선
3. Milestone 설정 (v0.1.0)
4. Project Board 연결
```

---

## 주의사항

### 스코프 크리프 방지:

```
Phase 1에서 절대 추가하지 말 것:
추가 컴포넌트 (9개로 충분)
Vue 버전 (Phase 1.5로)
고급 기능 (DatePicker, RichEditor 등)
Marketplace
VSCode Extension

Phase 1 목표:
최소한의 완성도로 빠르게 배포
실사용 피드백 수집
커뮤니티 형성
```

### 품질 기준:

```
모든 컴포넌트 반드시:
✓ WCAG 2.1 AA 준수
✓ 키보드 네비게이션
✓ 스크린 리더 대응
✓ 모바일 반응형
✓ 명도 대비 4.5:1
✓ 테스트 코드 (기본)
```

---

## 🎉 성공 정의

### Phase 1 성공 기준:

```
1. 배포 완료
   ✓ NPM에 @hanui/react 배포
   ✓ Docs 사이트 라이브
   ✓ create-hanui-app 동작

2. 실사용 확인
   ✓ 최소 3개 프로젝트에서 사용
   ✓ 긍정적 피드백 수집
   ✓ 치명적 버그 없음

3. 커뮤니티 형성
   ✓ Discord 20명+
   ✓ GitHub Issues 활발
   ✓ 개선 요청 들어옴
```

---

**작성자**: @odada-o
**버전**: v1.0
**최종 업데이트**: 2025-01-08

**Status**: 전략 확정 완료 → 🚀 개발 시작 준비 완료

**Next Action**: GitHub Issues 생성 → Week 1 Day 1 시작!
