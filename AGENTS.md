<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# LessonBranch Repo Notes

- Product: LessonBranch
- Stack: Next.js app router, Vercel, Supabase, Stripe
- Stage: early bootstrap

## Current V1 decisions

- parent-first web app
- no student login
- auth is magic link only
- billing is `$20/month`
- billing starts as a `7-day` trial with card required up front

## Coding rules

- keep implementation simple and inspectable
- do not commit real secrets
- use `.env.example` for required variables
- preserve a clean path to Supabase/Auth/Stripe integration
- prefer server components by default and add client components only when needed
