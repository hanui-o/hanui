프로젝트를 배포해줘.

## Arguments

- `$ARGUMENTS`: 배포 대상 (예: "preview", "production"). 기본값은 preview

## Instructions

1. **배포 환경 자동 감지:**
   - `vercel.json` 존재 → Vercel 배포
   - `netlify.toml` 존재 → Netlify 배포
   - `firebase.json` 존재 → Firebase 배포
   - 감지 실패 시 사용자에게 확인

2. **사전 확인:**
   - 커밋되지 않은 변경사항이 있으면 알림
   - 빌드가 성공하는지 확인 (`pnpm build` 또는 해당 빌드 명령어)
   - 현재 브랜치 확인

3. **Vercel 배포:**
   - CLI 설치 확인 (`vercel --version`), 없으면 설치 안내
   - preview: `vercel` (기본)
   - production: `vercel --prod` (사용자가 명시적으로 요청 시에만)
   - 배포 URL 알려주기

4. **기타 플랫폼:**
   - 해당 플랫폼 CLI 사용
   - 배포 완료 후 URL 알려주기

## Notes

- production 배포는 반드시 사용자 확인 후 진행
- 환경 변수 누락이 의심되면 경고
