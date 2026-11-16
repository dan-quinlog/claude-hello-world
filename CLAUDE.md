# hello-aws

Hello world on AWS Amplify Gen 2 (TypeScript). Global git, testing, and AWS rules in ~/.claude/CLAUDE.md also apply.

## Stack
- Backend: Amplify Gen 2, defined in TypeScript under `amplify/` (auth, data, functions). Use CDK custom resources only when Gen 2 constructs can't do it.
- Frontend: Vite + React + TypeScript.
- Package manager: npm.

## AWS
- Profile: `nisan`  Region: `us-east-1`. Pass `--profile nisan` on every `ampx` command. Never use the default profile.
- Dev backend is my personal sandbox: `npx ampx sandbox --profile nisan`. Run it only after I approve.
- Staging and main deploy through branch merges. Never deploy them from here.
- The CLI is `ampx`, not `amplify`. Gen 1 commands (`amplify push`, etc.) don't apply.
- Design the data schema and access patterns before editing `amplify/data/resource.ts`.
- If `ampx sandbox` errors about modules, set `"type": "module"` in package.json.

## Commands
Claude: after scaffolding, replace these placeholders with the real commands and keep them current.
- Dev server: `<fill in>`
- Narrow tests (changed code only): `<fill in>`
- Full suite (promotions only): `<fill in>`
