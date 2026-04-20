# Figma 디자인 검증 자동화 — 서브에이전트로 CSS 오차 잡기

> 이 글의 원본은 **<a href="https://hanui.io/blog/claude-code-figma-verifier" target="_blank" rel="noopener noreferrer">hanui 블로그</a>로 이전**했어요.
> 더 나은 가독성과 최신 내용은 원본 링크에서 확인해주세요!
>
> 👉 https://hanui.io/blog/claude-code-figma-verifier

---

Figma MCP로 UI를 구현하면 큰 틀은 잘 나오는데, padding이 2~3px 어긋나고 색상이 근사치로 들어가는 문제가 있습니다. Claude Code 서브에이전트로 "생성 → 검증 → 패치"를 한 턴에 해결하는 방법을 정리했어요.

`.claude/agents/figma-verifier.md` 파일 하나로 Figma 원본과 구현 코드의 CSS 수치를 자동 비교하고, 허용 오차를 넘으면 즉시 수정합니다.

전체 내용은 hanui 블로그에서 확인하세요 → **https://hanui.io/blog/claude-code-figma-verifier**
