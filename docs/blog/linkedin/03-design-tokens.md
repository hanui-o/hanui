# LinkedIn 글 - D+6 디자인 토큰

## 글 유형: 개인 스토리 + 인사이트

---

Tailwind CSS에서 KRDS 적용하려고 삽질한 적 있어요.

문제: Tailwind는 16px 기준, KRDS는 17px 기준.

처음엔 html { font-size: 17px } 했다가 spacing 전체가 틀어졌어요.
p-4가 16px이 아니라 17px이 되고... 난리.

결국 찾은 해결책:
✔️ spacing: 16px 기준 유지
✔️ font-size: px 고정값으로 KRDS 기준 적용
✔️ 색상: CSS 변수 + 시맨틱 토큰

이거 세팅하는 데 이틀 걸렸어요.

그래서 오픈소스로 만들었습니다.
HANUI - KRDS Tailwind 프리셋 포함

npx hanui init 한 줄이면 끝.

👉 https://hanui.io

#Tailwind #KRDS #디자인시스템 #React #프론트엔드
