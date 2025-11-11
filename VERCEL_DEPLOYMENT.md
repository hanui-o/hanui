# Vercel 배포 및 도메인 연결 가이드

## 1. Vercel 프로젝트 생성

### 1-1. Vercel 가입 및 GitHub 연결

1. **Vercel 접속**: https://vercel.com
2. **GitHub로 로그인**: "Continue with GitHub" 클릭
3. GitHub 계정 연동 승인

### 1-2. 새 프로젝트 Import

1. Vercel 대시보드에서 **"Add New" → "Project"** 클릭
2. GitHub 저장소 선택: **odada-o/hanui**
3. 저장소 권한 부여 (처음이라면 "Add GitHub Account" 또는 "Adjust GitHub App Permissions")

### 1-3. 프로젝트 설정

```
Project Name: hanui-docs
Framework Preset: Next.js (자동 감지됨)
Root Directory: apps/docs
Build Command: pnpm build (자동 설정됨)
Output Directory: .next (자동 설정됨)
Install Command: pnpm install (자동 설정됨)
```

**중요**: Root Directory를 `apps/docs`로 설정해야 합니다!

### 1-4. 환경 변수 설정 (중요!)

프로젝트 설정 페이지에서 **Environment Variables** 섹션에 다음을 추가:

```
ENABLE_EXPERIMENTAL_COREPACK=1
```

이 설정은 Vercel이 package.json의 `packageManager` 필드를 읽어 자동으로 pnpm 10.17.1을 사용하도록 합니다.

**참고**: Node.js 버전은 자동으로 20.x가 선택됩니다 (package.json engines 설정 기준)

### 1-5. 배포

**"Deploy"** 버튼 클릭 → 첫 배포 시작 → 완료되면 임시 URL 생성

- 예: `https://hanui-docs.vercel.app`

---

## 2. 도메인 연결 (hanui.io)

### 2-1. Vercel에서 도메인 추가

1. 프로젝트 대시보드 → **Settings** → **Domains**
2. **"Add"** 버튼 클릭
3. 도메인 입력: `hanui.io`
4. **"Add"** 클릭

### 2-2. DNS 설정값 확인

Vercel이 제공하는 DNS 레코드 정보:

#### A 레코드

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

#### CNAME 레코드 (www 서브도메인)

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

---

## 3. 가비아 DNS 설정

### 3-1. 가비아 로그인

1. https://www.gabia.com 접속
2. 로그인
3. **My가비아** → **서비스 관리** → **도메인**
4. `hanui.io` 도메인 선택

### 3-2. DNS 정보 설정

**"DNS 정보" 또는 "DNS 설정"** 메뉴 클릭

#### A 레코드 추가/수정

```
호스트: @
타입/유형: A
값/위치: 76.76.21.21
TTL: 3600 (기본값)
```

#### CNAME 레코드 추가 (www)

```
호스트: www
타입/유형: CNAME
값/위치: cname.vercel-dns.com
TTL: 3600 (기본값)
```

**"저장" 또는 "설정" 버튼** 클릭

---

## 4. DNS 전파 확인

### 4-1. 전파 시간

- 최소: 5-10분
- 평균: 30분
- 최대: 48시간 (드물게)

### 4-2. 확인 방법

#### 터미널에서 확인

```bash
# A 레코드 확인
nslookup hanui.io

# 또는
dig hanui.io

# 결과에 76.76.21.21이 나오면 성공
```

#### 온라인 도구

https://dnschecker.org 에서 `hanui.io` 입력 → 글로벌 DNS 전파 상태 확인

### 4-3. Vercel에서 확인

프로젝트 **Settings → Domains**에서:

- ✅ `Valid Configuration` 표시되면 성공
- ⏳ `Pending` 상태면 DNS 전파 대기 중

---

## 5. HTTPS 인증서

### 자동 발급

Vercel이 자동으로 SSL 인증서(Let's Encrypt) 발급:

- DNS 설정 확인 후 자동 발급
- 시간: 수분 ~ 1시간
- https://hanui.io 접속 가능

### 확인

1. https://hanui.io 접속
2. 브라우저 주소창에 자물쇠 아이콘 확인
3. 인증서 정보 확인 (발급자: Let's Encrypt)

---

## 6. 자동 배포 설정

### 기본 설정 (자동)

```
main 브랜치 푸시 → 자동 배포 (Production)
다른 브랜치 푸시 → 프리뷰 배포
PR 생성 → 프리뷰 배포
```

### 배포 확인

```bash
# 로컬에서 변경사항 푸시
git push origin main

# Vercel이 자동으로 감지하여 배포 시작
# 대시보드에서 진행 상황 확인 가능
```

---

## 7. 트러블슈팅

### pnpm 버전 에러 (ERR_PNPM_UNSUPPORTED_ENGINE)

**증상**:

```
Expected version: >=9.0.0
Got: 6.35.1
```

**원인**: Vercel이 오래된 pnpm 버전 사용

**해결 방법**:

1. Vercel 프로젝트 **Settings** → **Environment Variables** 이동
2. 다음 환경 변수 추가:
   ```
   Key: ENABLE_EXPERIMENTAL_COREPACK
   Value: 1
   ```
3. **Deployments** 탭에서 **Redeploy** 클릭
4. Vercel이 자동으로 package.json의 `packageManager: "pnpm@10.17.1"` 감지하여 올바른 버전 사용

### DNS 전파가 안 될 때

```bash
# 캐시 초기화
ipconfig /flushdns  # Windows
sudo dscacheutil -flushcache  # macOS
```

### SSL 인증서가 발급되지 않을 때

1. DNS 설정 재확인
2. Vercel Settings → Domains → 도메인 클릭 → **"Refresh SSL Certificate"**

### www 리다이렉트 설정

Vercel이 자동으로 `www.hanui.io` → `hanui.io` 리다이렉트 처리

---

## 8. 최종 확인 체크리스트

- [ ] Vercel 프로젝트 생성 완료
- [ ] Root Directory = `apps/docs` 설정
- [ ] 첫 배포 성공 (임시 URL 접속 가능)
- [ ] Vercel에 `hanui.io` 도메인 추가
- [ ] 가비아 A 레코드 설정 (`76.76.21.21`)
- [ ] 가비아 CNAME 레코드 설정 (`cname.vercel-dns.com`)
- [ ] DNS 전파 완료 (`nslookup hanui.io`)
- [ ] Vercel에서 `Valid Configuration` 확인
- [ ] https://hanui.io 접속 성공
- [ ] HTTPS 인증서 확인
- [ ] www.hanui.io → hanui.io 리다이렉트 확인

---

## 📚 참고 링크

- [Vercel 문서](https://vercel.com/docs)
- [Custom Domains 가이드](https://vercel.com/docs/concepts/projects/domains)
- [DNS 설정 가이드](https://vercel.com/docs/concepts/projects/domains/add-a-domain)
- [가비아 고객센터](https://customer.gabia.com/)

---

**작성일**: 2024-11-11
**문서 버전**: v1.0
