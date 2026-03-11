# Building a CMS in One Day with Claude Code — From Planning to PR

tags : Claude Code, AI, CMS, Next.js, GitHub, Automation, React

I built a full CMS frontend in one day using Claude Code — from reading the project spec to creating GitHub issues to writing code to pushing PRs.

Here's the workflow that made it possible.

## 1. What is Claude Code?

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) is Anthropic's CLI-based AI coding tool. Unlike IDE autocomplete tools, it can **read files, edit code, and run terminal commands** directly.

```bash
npm install -g @anthropic-ai/claude-code
claude
```

The key concept is **CLAUDE.md** — a project-level instruction file that Claude follows:

```markdown
# CLAUDE.md

- Named exports only, no default exports
- Use KRDS color tokens (krds-primary-_, krds-gray-_)
- Component → Block → Kit architecture
```

## 2. Reading the Project Spec from Notion

Our project had a full spec on Notion — sitemap, 12 wireframes, DB schema, API design.

```
Me: "Read this Notion spec"
    https://notion.so/...

Claude: Found 7 sub-pages.
        - Sitemap: 5 menus, 17 sub-menus
        - Wireframes: 12 screens
        - DB: users, posts, pages, menus, files
```

Claude remembers context across the session, so every subsequent task references the spec automatically.

## 3. Automating Development with GitHub Issues

This was the game-changer.

### Auto-creating labels, milestones, and issues

```
Me: "Set up GitHub project management"

Claude: Created:
        - 9 labels (frontend, backend, admin, web, etc.)
        - 5 milestones (Phase 1-A MVP through Phase 4)
        - 18 issues with labels and milestones
        - GitHub Projects board with all issues linked
```

### Coding by issue number

```
Me: "Start with issue #1"

Claude: Implementing login page.
        Found LoginForm block in @hanui/react. Using it.
```

Claude finds existing components in the design system and composes them. Commit messages auto-reference issue numbers:

```
feat(admin): login page (#1)
feat(admin): all admin screens (#3, #4, #5, #8, #9, #10, #11, #18)
feat(web): public site pages (#13, #14, #15, #16, #17)
feat(admin): Tiptap editor, page editor, menu management (#6, #7, #12)
```

### What we built in one day

| Category | Screens                                                       |
| -------- | ------------------------------------------------------------- |
| Auth     | Login (mock)                                                  |
| Admin    | Dashboard, Posts, Media, Settings, Users, Trash, Pages, Menus |
| Editor   | Tiptap (formatting, alignment, lists, tables, images, links)  |
| Public   | Main, About (with LNB), Board list/detail                     |
| Infra    | Monorepo (pnpm + Turbo), design tokens, GitHub Projects board |

All mock data — but the **routing and screen structure is complete**. Just connect the API.

## 4. Creating PRs

Claude Code can create PRs too, since it has access to `gh` CLI:

```bash
gh pr create --title "feat: admin + public frontend" --body "$(cat <<'EOF'
## Summary
- 11 admin screens with HANUI blocks
- Tiptap editor for posts and pages
- Public site with header, footer, board pages
- KRDS design token setup

## Test plan
- [ ] Login → dashboard navigation
- [ ] Post editor with Tiptap
- [ ] Public board list → detail flow
EOF
)"
```

It can also **review PRs** — give it a PR URL and it analyzes changes and leaves comments.

## Tips from Real Usage

1. **Write a good CLAUDE.md** — Project conventions go here. Without it, you'll repeat instructions every time.

2. **Build often** — Run `pnpm build` after each change. Claude fixes type errors and lint issues immediately when shown the error output.

3. **Commit in small units** — Feature-by-feature commits keep history clean and make rollbacks easy.

## Conclusion

Claude Code isn't "write code for me" — it's **"let's build this project together."**

Planning → Issues → Coding → Build → Commit → PR — the entire dev workflow in one loop.

Especially for projects with many screens and repeated patterns (like government CMS), the productivity boost is real. We closed 18 frontend issues in a single day.

---

> Project used in this post:
>
> - [HANUI](https://github.com/hanui-o/hanui) — KRDS-based React design system
> - [hanui CMS](https://github.com/hanui-o/hanui-cms) — CMS built with HANUI (private)
