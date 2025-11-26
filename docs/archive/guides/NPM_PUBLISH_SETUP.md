# NPM 배포 설정 가이드

이 문서는 HANUI 프로젝트의 NPM 자동 배포를 위한 설정 가이드입니다.

## 1. NPM Token 생성

### 1.1 NPM 로그인

```bash
npm login
```

### 1.2 NPM Access Token 생성

1. NPM 웹사이트 접속: https://www.npmjs.com/
2. 로그인 후 우측 상단 프로필 클릭 → **Access Tokens** 선택
3. **Generate New Token** → **Classic Token** 선택
4. Token Type: **Automation** 선택 (CI/CD용)
5. Token 생성 후 복사 (한 번만 표시됨!)

## 2. GitHub Secrets 등록

### 2.1 Repository Settings 이동

1. GitHub 저장소 페이지: https://github.com/hanui-o/hanui
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret** 클릭

### 2.2 NPM_TOKEN 등록

- **Name**: `NPM_TOKEN`
- **Secret**: 위에서 복사한 NPM token 붙여넣기
- **Add secret** 클릭

## 3. 배포 프로세스

### 3.1 Changeset 추가

변경사항이 있을 때마다 changeset을 추가합니다:

```bash
pnpm changeset
```

**Prompt 응답:**

- 변경된 패키지 선택 (Space로 선택, Enter로 확인)
  - `@hanui/core`
  - `@hanui/react`
  - `create-hanui-app`
- 변경 타입 선택:
  - **patch**: 버그 수정 (0.0.1 → 0.0.2)
  - **minor**: 새 기능 추가 (0.0.0 → 0.1.0)
  - **major**: Breaking change (0.0.0 → 1.0.0)
- 변경 내용 작성 (마크다운 형식)

### 3.2 Changeset 커밋

```bash
git add .changeset
git commit -m "chore: add changeset for [feature/fix description]"
git push
```

### 3.3 자동 배포 프로세스

#### Option 1: Changeset PR 방식 (권장)

1. main 브랜치에 changeset이 push되면 GitHub Actions가 자동 실행
2. **Version Packages** PR이 자동 생성됨
3. PR을 머지하면:
   - package.json 버전이 자동으로 업데이트됨
   - CHANGELOG.md가 자동으로 생성됨
   - NPM에 자동으로 배포됨
   - GitHub Release가 자동으로 생성됨

#### Option 2: 수동 배포

```bash
# 1. 버전 업데이트
pnpm version-packages

# 2. 커밋 및 푸시
git add .
git commit -m "chore: version packages"
git push

# 3. 배포 (main 브랜치에 push하면 자동 실행됨)
```

## 4. 배포 확인

### 4.1 NPM 확인

- https://www.npmjs.com/package/@hanui/core
- https://www.npmjs.com/package/@hanui/react
- https://www.npmjs.com/package/create-hanui-app

### 4.2 GitHub Release 확인

- https://github.com/hanui-o/hanui/releases

## 5. 패키지 설치 테스트

```bash
# 새 프로젝트에서 테스트
npm install @hanui/react@latest
# 또는
npx create-hanui-app@latest my-test-project
```

## 6. Troubleshooting

### 배포가 실패하는 경우

1. **NPM_TOKEN 확인**
   - GitHub Secrets에 `NPM_TOKEN`이 정확히 등록되었는지 확인
   - Token이 만료되지 않았는지 확인

2. **권한 확인**
   - NPM 계정에 패키지 배포 권한이 있는지 확인
   - Organization 패키지인 경우 @hanui org에 접근 권한이 있는지 확인

3. **버전 충돌**
   - 이미 배포된 버전과 동일한 버전으로 배포하려고 하는지 확인
   - `pnpm version-packages`를 실행하여 버전이 정확히 업데이트되었는지 확인

4. **빌드 실패**
   - CI에서 build가 성공했는지 확인
   - 로컬에서 `pnpm build` 실행하여 빌드 오류가 없는지 확인

### GitHub Actions 로그 확인

1. GitHub 저장소 → **Actions** 탭
2. 실패한 workflow 클릭
3. 각 step의 로그 확인

## 7. 배포 체크리스트

배포 전 확인사항:

- [ ] 모든 테스트 통과 (`pnpm test`)
- [ ] Lint 통과 (`pnpm lint`)
- [ ] 빌드 성공 (`pnpm build`)
- [ ] Changeset 추가됨 (`pnpm changeset`)
- [ ] CHANGELOG 확인
- [ ] package.json 버전 확인
- [ ] NPM_TOKEN이 GitHub Secrets에 등록됨
- [ ] 로컬에서 패키지 테스트 완료

## 8. 첫 배포 (v0.1.0)

첫 배포 시 추가 작업:

```bash
# 1. 초기 changeset 생성
pnpm changeset

# 2. 모든 패키지 선택 (Space)
#    - @hanui/core
#    - @hanui/react
#    - create-hanui-app

# 3. 변경 타입: minor 선택 (0.0.0 → 0.1.0)

# 4. Summary 작성:
# "Initial release with 9 KRDS components, Portal/Admin templates, and CLI"

# 5. 커밋 및 푸시
git add .
git commit -m "chore: add changeset for v0.1.0 initial release"
git push

# 6. Version Packages PR 생성됨 → 머지
# 7. 자동으로 NPM 배포 및 GitHub Release 생성
```

## 9. 참고 문서

- [Changesets Documentation](https://github.com/changesets/changesets)
- [GitHub Actions - Publishing to npm](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages)
- [NPM Token Types](https://docs.npmjs.com/about-access-tokens)
