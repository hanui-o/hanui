# Claude Code로 CMS 프로젝트 하루만에 만들기 — 기획부터 코딩까지 자동화

tags : Claude Code, AI, CMS, Next.js, GitHub, 자동화, 공공SI, HANUI

Claude Code로 CMS 프로젝트를 하루만에 기획 → 이슈 생성 → 코딩 → PR까지 해봤어요.

"AI가 코딩을 해준다"는 말은 많이 들었는데, 실제로 **프로젝트 전체 흐름**을 같이 해보니까 느낌이 달라요. 그냥 코드 자동완성이 아니라, 기획서 읽고 → 이슈 만들고 → 코드 짜고 → 커밋까지 하는 **페어 프로그래밍 파트너**에 가까웠어요.

## 1. Claude Code란?

[Claude Code](https://docs.anthropic.com/en/docs/claude-code)는 Anthropic에서 만든 CLI 기반 AI 코딩 도구예요.

VS Code나 터미널에서 바로 쓸 수 있고, **파일을 직접 읽고, 편집하고, 터미널 명령어를 실행**할 수 있어요.

```bash
# 설치
npm install -g @anthropic-ai/claude-code

# 프로젝트 폴더에서 실행
claude
```

Copilot이나 Cursor랑 다른 점:

|          | Copilot / Cursor     | Claude Code                     |
| -------- | -------------------- | ------------------------------- |
| 방식     | IDE 내 자동완성 / 챗 | CLI에서 직접 파일 조작          |
| 범위     | 현재 파일 중심       | 프로젝트 전체 탐색              |
| 실행     | 코드 제안만          | `git`, `npm`, `gh` 등 직접 실행 |
| 컨텍스트 | 열린 파일            | CLAUDE.md + 전체 코드베이스     |

핵심은 **CLAUDE.md** 파일이에요. 프로젝트 루트에 이 파일을 두면 Claude가 프로젝트 규칙을 이해하고 따라요.

```markdown
# CLAUDE.md 예시

- Named export만 사용, default export 금지
- KRDS 색상 토큰 사용 (krds-primary-_, krds-gray-_)
- cn() 유틸로 className 병합
- Component → Block → Kit 3단 구조
```

## 2. 노션 기획서 → Claude Code가 읽고 이해

우리 프로젝트에는 노션에 기획서가 있었어요. 사이트맵, 와이어프레임 12개 화면, DB 설계, API 설계까지.

Claude Code에 노션 URL을 주니까 **알아서 읽고 요약**해줬어요.

```
나: "이 노션 기획서 읽어줘"
    https://notion.so/31b600de613681ef9d54ea74eba6949d

Claude: 총 7개 하위 페이지를 확인했습니다.
        - 사이트맵: 5개 메뉴, 17개 서브메뉴
        - 와이어프레임: 12개 화면 (로그인, 대시보드, 게시판...)
        - DB 설계: users, posts, pages, menus, files 테이블
        - API 설계: 인증, 게시판, 페이지, 파일, 설정 엔드포인트
```

기획서를 한번 읽히면 이후 작업에서 계속 참고해요. "대시보드에 뭐 넣을까?" 물으면 기획서 기반으로 대답하고, 코드도 거기에 맞춰 짜요.

**팁**: Claude Code는 `memory` 폴더에 프로젝트 맥락을 저장해요. 다음 세션에서도 이어서 작업할 수 있어요.

## 3. GitHub 이슈로 코딩 자동화

이게 진짜 강력했어요. "할일을 이슈에 적어놓고 자동화하고 싶어"라고 했더니:

### 3-1. 라벨 + 마일스톤 + 이슈 자동 생성

```
나: "할일을 이슈에 적어놓고 자동화 하고 싶어"

Claude: 어떤 방식으로 관리할까요?
        1. 이슈만
        2. 이슈 + 마일스톤
        3. 이슈 + 마일스톤 + 보드 (추천)

나: 3번
```

그러자 `gh` CLI로 한 방에:

```bash
# 라벨 9개 생성
gh label create frontend --color 0075ca
gh label create backend --color e99695
gh label create admin --color 5319e7
# ... 총 9개

# 마일스톤 5개 생성
gh api repos/hanui-o/hanui-cms/milestones -f title="Phase 1-A: MVP"
# ... 총 5개

# 이슈 18개 생성
gh issue create --title "[FE] 로그인 페이지" --label frontend,admin
gh issue create --title "[FE] 대시보드" --label frontend,admin
# ... 총 18개
```

**GitHub Projects 보드**까지 만들고 이슈를 전부 연결해줬어요.

### 3-2. 이슈 번호로 코딩

이슈가 생기니까 작업 흐름이 깔끔해졌어요.

```
나: "1번 이슈부터 해줘"

Claude: #1 로그인 페이지를 구현하겠습니다.
        hanui에 LoginForm 블록이 있네요. 이걸 사용합니다.
```

Claude가 `@hanui/react`에서 쓸 수 있는 블록을 찾아서 가져다 씁니다. `LoginForm`, `AdminLayout`, `BoardManagement` 같은 기존 컴포넌트를 알아서 조합해요.

커밋 메시지에도 이슈 번호가 자동으로 들어가요:

```
feat(admin): 로그인 페이지 구현 (#1)
feat(admin): 어드민 전체 화면 구현 (#3, #4, #5, #8, #9, #10, #11, #18)
feat(web): 퍼블릭 사이트 공통 레이아웃 및 주요 페이지 구현 (#13, #14, #15, #16, #17)
feat(admin): Tiptap 에디터, 고정페이지 편집, 메뉴 관리 CRUD 구현 (#6, #7, #12)
```

### 3-3. 하루 만에 만든 것들

| 카테고리 | 화면                                                            |
| -------- | --------------------------------------------------------------- |
| 인증     | 로그인 (mock, 기본값 자동 입력)                                 |
| 어드민   | 대시보드, 게시판, 미디어, 설정, 계정, 휴지통, 고정 페이지, 메뉴 |
| 에디터   | Tiptap (서식, 정렬, 목록, 표, 이미지, 링크)                     |
| 퍼블릭   | 메인, 기관소개(LNB), 게시판 목록/상세                           |
| 인프라   | 모노레포(pnpm + Turbo), KRDS 디자인 토큰, GitHub 프로젝트 보드  |

물론 전부 mock 데이터지만, **화면 구조와 라우팅이 완성**되어 있어서 백엔드 API만 연결하면 돼요.

## 4. PR도 쓸 수 있어

Claude Code는 `gh` CLI를 쓸 수 있으니까 PR 생성도 가능해요.

```
나: "지금까지 작업한 거 PR 올려줘"

Claude: 현재 브랜치의 커밋을 분석하겠습니다.
```

이러면 Claude가:

1. `git log`으로 커밋 히스토리 확인
2. `git diff main...HEAD`로 변경사항 분석
3. PR 제목 + 본문 작성
4. `gh pr create` 실행

```bash
gh pr create --title "feat: 어드민 + 퍼블릭 프론트엔드 구현" --body "$(cat <<'EOF'
## Summary
- 어드민 전체 화면 구현 (로그인, 대시보드, 게시판, 미디어 등 11개)
- Tiptap 에디터 연동 (게시글 작성/수정, 고정 페이지 편집)
- 퍼블릭 사이트 기본 화면 (메인, 기관소개, 게시판 목록/상세)
- KRDS 디자인 토큰 및 모노레포 설정

## Test plan
- [ ] 어드민 로그인 → 대시보드 진입 확인
- [ ] 게시글 작성 → Tiptap 에디터 동작 확인
- [ ] 퍼블릭 메인 → 게시판 목록 → 상세 네비게이션 확인
EOF
)"
```

**코드 리뷰할 때도 유용해요.** 다른 사람이 올린 PR URL을 주면 변경사항을 분석하고 리뷰 코멘트도 달아줘요.

## 실전 팁

### CLAUDE.md를 잘 써라

프로젝트 컨벤션을 CLAUDE.md에 적어두면 Claude가 **일관된 코드**를 짜요. 우리는 이렇게 적어뒀어요:

- Named export만, default export 금지
- Modal은 `onClose` prop (not `onOpenChange`)
- Badge variants: primary, info, gray, secondary, success, warning, error

이걸 안 써두면 매번 "이 프로젝트에서는 이렇게 해줘"라고 말해야 해요.

### 빌드를 자주 시켜라

Claude가 코드를 짜면 바로 `pnpm build`를 시켜요. 타입 에러나 lint 에러를 즉시 잡고 고쳐요. 우리도 작업하면서 한 10번은 빌드 에러를 잡았어요:

- `React.ReactNode` → `import type { ReactNode }` (ESLint no-undef)
- Tiptap v3에서 `import Table` → `import { Table }` (named export)
- hanui `Modal`에 `title` prop 없음 → 내부에 `<h2>` 직접 추가

빌드 에러 메시지를 보여주면 Claude가 알아서 고쳐요.

### 작은 단위로 커밋시켜라

한 번에 다 하지 말고 기능 단위로 커밋하면 히스토리가 깔끔해요:

```
42a9522 초기 모노레포 세팅: admin + web + shared
4c48faf feat(admin): 로그인 페이지 구현 (#1)
08e5924 feat(admin): 어드민 전체 화면 구현 (#3, #4, #5, ...)
b804b52 feat(web): 퍼블릭 사이트 구현 (#13, #14, #15, ...)
bc69424 fix: KRDS 디자인 토큰 설정
c9df0af feat(admin): Tiptap 에디터, 메뉴 관리 (#6, #7, #12)
```

## 마무리

Claude Code는 "코드 좀 짜줘"가 아니라 **"같이 프로젝트 하자"**에 가까워요.

기획서 읽기 → 이슈 정리 → 코딩 → 빌드 확인 → 커밋 → PR까지, 개발 워크플로우 전체를 같이 돌릴 수 있어요.

특히 공공 SI처럼 화면이 많고 반복 패턴이 있는 프로젝트에서는 생산성이 확실히 올라요. 디자인 시스템(HANUI) 블록을 가져다 쓰면서 **18개 이슈를 하루 만에 프론트엔드 화면을 거의 다 만들었거든요.**

다음에는 백엔드(전자정부프레임워크 v5) 연동 과정도 공유할게요.

---

> 이 글에서 사용한 프로젝트:
>
> - [HANUI](https://github.com/hanui-o/hanui) — KRDS 기반 React 디자인 시스템
> - [hanui CMS](https://github.com/hanui-o/hanui-cms) — HANUI 기반 공공기관 CMS (비공개)
