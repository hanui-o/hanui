# 실전 웹 접근성 CI 파이프라인 — axe + Playwright로 회귀 감지하기

> 이 글의 원본은 **<a href="https://hanui.io/blog/a11y-ci-pipeline" target="_blank" rel="noopener noreferrer">hanui 블로그</a>로 이전**했어요.
> 더 나은 가독성과 최신 내용은 원본 링크에서 확인해주세요!
>
> 👉 https://hanui.io/blog/a11y-ci-pipeline

---

운영 중인 서비스에 접근성 자동 검사를 붙이는 실전 가이드입니다. axe-core + Playwright로 페이지 단위 스캔, GitHub Actions CI, PR 코멘트 자동 리포트, 베이스라인 → 게이팅 2단계 전략까지 정리했어요.

SSO 인증 처리, 토큰 만료 대응, 스캔 실패와 통과의 구별 같은 운영상 함정들도 함께 공유합니다.

전체 내용은 hanui 블로그에서 확인하세요 → **https://hanui.io/blog/a11y-ci-pipeline**
