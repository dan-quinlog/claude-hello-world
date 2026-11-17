# hello-aws

Hello world on AWS Amplify Gen 2 (TypeScript). Global git, testing, and AWS rules in ~/.claude/CLAUDE.md also apply.

## Stack
- Backend: Amplify Gen 2, defined in TypeScript under `amplify/` (auth, data, functions). Use CDK custom resources only when Gen 2 constructs can't do it.
- Frontend: Vite + React + TypeScript.
- Package manager: npm.

## AWS
- Profile: `nee`  Region: `us-east-1`. Pass `--profile nee` on every `ampx` command. Never use the default profile.
- Dev backend is my personal sandbox: `npx ampx sandbox --profile nee`. Run it only after I approve.
- Staging and main deploy through branch merges. Never deploy them from here.
- The CLI is `ampx`, not `amplify`. Gen 1 commands (`amplify push`, etc.) don't apply.
- Design the data schema and access patterns before editing `amplify/data/resource.ts`.
- If `ampx sandbox` errors about modules, set `"type": "module"` in package.json.

## Commands
Claude: keep these current.
- Dev server: `npm run dev` (needs `amplify_outputs.json` from a running `npx ampx sandbox --profile nee`)
- Narrow tests (changed code only): `npm run test:changed` (`vitest run --changed dev`: tests related to files changed vs. the `dev` branch)
- Full suite (promotions only): `npm run test:full` (`tsc -b && vitest run`; the type-check needs `amplify_outputs.json`)
- Lint: `npm run lint` (oxlint)
- Keep `"strict": true` in `tsconfig.app.json`. Amplify's generated `Schema` client types break without it.
