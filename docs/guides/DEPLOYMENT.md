# HANUI 배포 가이드

> NPM 패키지 배포 + Vercel 문서 사이트 배포 완벽 가이드

---

## 📦 1. NPM 패키지 배포

### 대상 패키지

- `@hanui/react` - React 컴포넌트 라이브러리
- `create-hanui-app` - CLI 도구

### 배포 시점

- **Issue #21**: NPM 배포 준비
- **Issue #22**: GitHub Actions CI/CD 설정
- **Issue #23**: v0.1.0 First Release

### 배포 방법

#### A. NPM 계정 설정 (Issue #21)

1. **NPM 가입**

   ```bash
   npm adduser
   # Username: odada-o
   # Email: your-email@example.com
   ```

2. **Organization 생성**

   ```
   https://www.npmjs.com/org/create
   Organization name: hanui
   → @hanui scope 사용 가능
   ```

3. **NPM 토큰 발급**

   ```
   https://www.npmjs.com/settings/your-username/tokens
   → Generate New Token
   → Type: Automation
   → Copy token
   ```

4. **GitHub Secrets 설정**
   ```
   GitHub Repository → Settings → Secrets and variables → Actions
   → New repository secret
   Name: NPM_TOKEN
   Value: (복사한 토큰)
   ```

#### B. GitHub Actions 설정 (Issue #22)

**`.github/workflows/publish.yml`**

```yaml
name: Publish to NPM

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: pnpm install

      - name: Build packages
        run: pnpm build

      - name: Publish to NPM
        run: pnpm publish -r --access public --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

#### C. 배포 실행 (Issue #23)

```bash
# 1. 버전 업데이트
pnpm version 0.1.0

# 2. CHANGELOG 작성
echo "v0.1.0 - First Release" > CHANGELOG.md

# 3. 커밋 및 태그
git add .
git commit -m "chore: release v0.1.0"
git tag v0.1.0

# 4. 푸시 (자동 배포 트리거)
git push origin main
git push origin v0.1.0

# → GitHub Actions가 자동으로 NPM에 배포
```

#### D. 배포 확인

```
https://www.npmjs.com/package/@hanui/react
https://www.npmjs.com/package/create-hanui-app
```

---

## 🌐 2. Vercel 문서 사이트 배포

### 대상

- `apps/docs` - Next.js 문서 사이트

### 배포 시점

- **Issue #18**: 문서 사이트 초기 설정 + Vercel 배포

### 배포 방법

#### A. Vercel 프로젝트 생성

1. **Vercel 가입**

   ```
   https://vercel.com
   → Continue with GitHub
   ```

2. **프로젝트 연결**

   ```
   Dashboard → New Project
   → Import Git Repository
   → Select: hanui-o/hanui
   ```

3. **프로젝트 설정**

   ```
   Project Name: hanui-docs
   Framework Preset: Next.js (자동 감지)
   Root Directory: apps/docs
   Build Command: pnpm build (자동)
   Output Directory: .next (자동)
   Install Command: pnpm install (자동)
   ```

4. **환경 변수 (필요 시)**

   ```
   NODE_VERSION=20
   ```

5. **Deploy**
   ```
   → Deploy 버튼 클릭
   → 자동 배포 시작
   → 배포 완료 후 임시 URL 생성
   ```

#### B. 도메인 연결 (`hanui.io`)

1. **Vercel에서 도메인 추가**

   ```
   Project → Settings → Domains
   → Add 버튼 클릭
   → hanui.io 입력
   → Add
   ```

2. **DNS 설정값 확인**

   ```
   Vercel이 제공하는 DNS 레코드:

   Type    Name    Value
   ────────────────────────────────────────────────
   A       @       76.76.21.21
   CNAME   www     cname.vercel-dns.com
   ```

3. **가비아 DNS 설정**

   **가비아 로그인:**

   ```
   https://www.gabia.com
   → My가비아 → 서비스 관리
   → hanui.io 선택
   → DNS 정보 (또는 DNS 설정)
   ```

   **DNS 레코드 추가:**

   ```
   타입: A
   호스트: @
   값/위치: 76.76.21.21
   TTL: 3600
   ```

   ```
   타입: CNAME
   호스트: www
   값/위치: cname.vercel-dns.com
   TTL: 3600
   ```

   **저장 및 적용**

4. **DNS 전파 확인**

   ```bash
   # 터미널에서 확인
   nslookup hanui.io
   # 또는
   dig hanui.io

   # 결과: 76.76.21.21이 나오면 성공
   ```

   **온라인 도구:**

   ```
   https://dnschecker.org
   → hanui.io 입력
   → 글로벌 DNS 전파 상태 확인
   ```

   **대기 시간:** 5분 ~ 48시간 (보통 10-30분)

5. **Vercel에서 확인**

   ```
   Settings → Domains
   → hanui.io 상태: Valid Configuration ✅
   ```

6. **HTTPS 자동 발급**
   ```
   Vercel이 자동으로 SSL 인증서 발급
   → https://hanui.io 접속 가능
   ```

#### C. 자동 배포 설정

**기본 설정 (자동):**

```
main 브랜치 푸시 → 자동 배포
PR 생성 → 프리뷰 배포
```

**수동 배포:**

```bash
git push origin main
# → Vercel이 자동으로 감지하여 배포
```

#### D. 배포 확인

```
Production: https://hanui.io
Preview: https://hanui-docs-git-feat-xxx.vercel.app
```

---

## 🔄 3. 자동 배포 흐름

### 개발 워크플로우

```
1. 로컬 개발
   git checkout -b feat/new-feature
   ... 개발 ...
   git push origin feat/new-feature
   ↓
2. PR 생성
   → Vercel 프리뷰 배포 (자동)
   → https://hanui-docs-git-feat-new-feature.vercel.app
   ↓
3. PR 리뷰 및 머지
   git checkout main
   git merge feat/new-feature
   git push origin main
   ↓
4. Production 배포 (자동)
   → https://hanui.io 업데이트
```

### NPM 릴리스 워크플로우

```
1. 버전 업데이트 및 CHANGELOG 작성
   pnpm version 0.2.0
   ... CHANGELOG.md 작성 ...
   ↓
2. 커밋 및 태그
   git commit -m "chore: release v0.2.0"
   git tag v0.2.0
   ↓
3. 푸시
   git push origin main
   git push origin v0.2.0
   ↓
4. GitHub Actions 자동 실행
   → NPM 배포 (자동)
   → https://www.npmjs.com/package/@hanui/react
```

---

## 📊 4. 배포 상태 확인

### NPM 패키지

```
https://www.npmjs.com/package/@hanui/react
https://www.npmjs.com/package/create-hanui-app
```

### 문서 사이트

```
Production: https://hanui.io
Vercel Dashboard: https://vercel.com/hanui-o/hanui-docs
```

### GitHub Actions

```
https://github.com/hanui-o/hanui/actions
```

---

## 🐛 5. 문제 해결

### NPM 배포 실패

**토큰 만료:**

```bash
# NPM 토큰 재발급
https://www.npmjs.com/settings/your-username/tokens
→ Regenerate Token
→ GitHub Secrets 업데이트
```

**권한 오류:**

```bash
# Organization 멤버 확인
https://www.npmjs.com/settings/hanui/members
```

### Vercel 배포 실패

**빌드 오류:**

```
Vercel Dashboard → Deployments
→ 실패한 배포 클릭
→ Build Logs 확인
```

**DNS 전파 안됨:**

```bash
# DNS 설정 확인
nslookup hanui.io

# 가비아 DNS 설정 재확인
https://www.gabia.com
```

**HTTPS 오류:**

```
Vercel Dashboard → Settings → Domains
→ hanui.io 클릭
→ Refresh SSL Certificate
```

---

## ✅ 체크리스트

### Issue #21: NPM 배포 준비

- [ ] NPM 계정 생성
- [ ] @hanui organization 생성
- [ ] NPM 토큰 발급
- [ ] GitHub Secrets 설정
- [ ] package.json 메타데이터 확인
- [ ] .npmignore 작성

### Issue #22: GitHub Actions CI/CD

- [ ] `.github/workflows/publish.yml` 작성
- [ ] 워크플로우 테스트 (dry-run)

### Issue #18: Vercel 배포

- [ ] Vercel 프로젝트 생성
- [ ] GitHub 저장소 연결
- [ ] `hanui.io` 도메인 추가
- [ ] 가비아 DNS A 레코드 설정
- [ ] 가비아 DNS CNAME 레코드 설정
- [ ] DNS 전파 확인
- [ ] https://hanui.io 접속 테스트
- [ ] HTTPS 인증서 확인
- [ ] 자동 배포 테스트

### Issue #23: First Release

- [ ] 버전 0.1.0 확정
- [ ] CHANGELOG 작성
- [ ] git tag v0.1.0 생성
- [ ] NPM 배포 확인
- [ ] 문서 사이트 업데이트
- [ ] Release Notes 작성

---

## 📚 참고 자료

- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Vercel Deployment](https://vercel.com/docs/concepts/deployments/overview)
- [Custom Domains on Vercel](https://vercel.com/docs/concepts/projects/domains)
- [GitHub Actions](https://docs.github.com/en/actions)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Turborepo](https://turbo.build/repo/docs)

---

**작성자**: @odada-o
**작성일**: 2025-11-10
**버전**: v1.0
**Status**: 배포 가이드 완성 → Issue #18, #21, #22, #23에서 참고
