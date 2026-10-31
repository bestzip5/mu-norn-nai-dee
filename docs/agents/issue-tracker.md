# Issue tracker: GitHub

Issues and specs for this repo live in the GitHub Issues of `bestzip5/mu-norn-nai-dee`. Use the `gh` CLI from this repo for issue operations.

- Create: `gh issue create --title "..." --body-file <file>`.
- Read: `gh issue view <number> --comments`.
- List: `gh issue list --state open` with relevant labels and JSON fields.
- Update: `gh issue edit <number>` and `gh issue comment <number> --body-file <file>`.
- Close: `gh issue close <number>`.

**PRs as a request surface: no.**

When a skill says "publish to the issue tracker", create a GitHub issue. When it says "fetch the relevant ticket", read the issue and its comments.

For wayfinding, use one map issue with linked child issues. Record blockers with GitHub issue dependencies; if those are unavailable, list `Blocked by: #<number>` in the child issue. Work on unblocked issues first.
