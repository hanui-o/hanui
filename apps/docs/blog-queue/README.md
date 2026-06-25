# 블로그 예약 발행 큐

여기에 둔 글은 **사이트에 안 보여요.** 발행일이 되면 자동으로 올라갑니다.

## 어떻게 동작하나

- 매일 아침(09:10 KST) GitHub Actions(`.github/workflows/daily-publish.yml`)가 이 폴더를 훑어,
  프론트매터 `date`가 **오늘 이하**인 글을 `apps/docs/src/content/blog/`로 옮기고 커밋·푸시합니다.
- 푸시되면 Vercel이 자동 배포 → hanui.io에 글이 등장합니다.
- 하루 걸러도 밀린 글을 다음 실행 때 모두 따라잡습니다.
- 남은 예약글이 3편 미만이면 "재고 부족" GitHub 이슈로 알려줍니다.

## 쟁여두는 법 (시간 날 때 몰아서)

1. 글을 `apps/docs/blog-queue/[slug].mdx`로 작성한다. (형식은 `/blog` 커맨드와 동일)
2. 프론트매터 `date`에 **원하는 발행일**을 미래 날짜로 적는다.
   - 하루 한 편씩 내보내려면 날짜를 하루 간격으로 매긴다. 예: 06-27, 06-28, 06-29…
   - 같은 날짜를 여러 글에 주면 그날 한꺼번에 나가니(=배치 발행) 피한다.
3. 커밋·푸시한다. 끝.

## 수동 발행

지금 당장 발행 대상을 확인하거나 즉시 내보내고 싶으면:

```bash
# 로컬에서 미리보기(파일 안 옮김)
DRY_RUN=1 node scripts/publish-due-posts.mjs

# GitHub Actions 탭 → "Daily Blog Publish" → Run workflow (수동 트리거)
```
