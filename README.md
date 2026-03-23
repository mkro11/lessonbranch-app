# LessonBranch App

Initial LessonBranch web app scaffold.

Current stack:
- Next.js app router
- Vercel deployment target
- Supabase auth/data
- Stripe billing

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Fill in the Supabase and Stripe values from local machine secrets.
3. Run:

```bash
npm install
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000) by default.

## Current scope

This repo is intentionally at bootstrap stage.

Included now:
- app shell
- env template
- Supabase client stubs
- Stripe server stub

Not included yet:
- auth flow
- onboarding
- database schema
- branch planning UI
- billing checkout flow
