# AI Learning Platform

A Next.js-based AI tutoring platform with student progress tracking and instructor analytics.

## Architecture

- **Frontend**: Next.js 15 with TypeScript
- **Backend**: API routes with Postgres integration
- **Database**: PostgreSQL with Row-Level Security (RLS)
- **Auth**: Clerk (Sprint 1 stubs, full integration in Sprint 2)
- **Testing**: Jest + Supertest for API route testing

## Prerequisites

- Node.js 18+
- PostgreSQL database (Supabase recommended)
- Environment variables configured

## Setup Instructions

1. **Clone and Install Dependencies**

   ```bash
   git clone <repository-url>
   cd ai-learning-tool
   npm install
   ```

2. **Add Environment Variables**

Create .env file and add all of the environment variables from the 'AI Fellows: ai-learning-tool' Notion page under '.env.local setup'

3. **Run Tests**

   ```bash
   npm test
   # Tests use mock database for Sprint 1 - no real DB connection required
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Contributing

1. Complete your ticket

2. Run tests: `npm test`

- Follow the established patterns in `api/routes/` and `api/tests/`

3. Check linting: `npm run lint` and resolve any errors before pushing and submitting a PR

4. Ready to submit?- Point your PRs to the dev branch when you submit

5. Review process begins (all tests must pass before merging)

## Review process

1. If you need an approval for your pull request, post the PR link in the #aifellows25 Slack channel, say that you need a +1, and tag the DevOps team member you’re assigned to (also shared in Slack, may change in the future).

2. When someone from DevOps reviews it, they’ll put a green checkmark if it has been approved or reply to your post and say they left a comment if it wasn't

- Other: If the Vercel bot comments on your PR that there's a build error, run `npm run lint` and `npx tsc --noEmit` **(for TS errors)** locally to see the errors

## API Endpoints

### User Management

- `GET /api/me` - Get current user's profile (student only sees own data)
- `GET /api/users` - Get all users (admin only)
- `PATCH /api/me/progress` - Update session counters (student only)

All endpoints require `Authorization: Bearer <token>` header.

## Testing Framework

**Jest + Supertest** is used for API route testing:

- **Location**: `api/tests/`
- **Run Tests**: `npm test`
- **Coverage**: 10 comprehensive tests covering student/admin RLS behavior
- **Mock Database**: Sprint 1 uses mocked database for isolated testing

The dev branch will automatically deploy to Vercel, which is our QA/Testing environment. This is our temporary url for the QA env: [https://ai-learning-tool-git-dev-sebastian-vivas-projects.vercel.app/](https://ai-learning-tool-git-dev-sebastian-vivas-projects.vercel.app/) Anything that gets merged to dev will deploy here.

### Test Categories

- ✅ Student self-access (RLS enforced)
- ✅ Admin access controls
- ✅ Input validation
- ✅ Authentication edge cases
- ✅ Progress tracking updates

## Database Schema

See [`docs/USER_SCHEMA.md`](docs/USER_SCHEMA.md) for complete schema documentation including:

- `profiles` table structure
- Row-Level Security policies
- Placeholder fields for Sprint 1
- JSON schemas for achievements

## Project Structure

```
├── api/
│   ├── lib/
│   │   ├── auth.ts          # Clerk integration (Sprint 1 stubs)
│   │   └── db.ts            # PostgreSQL connection
│   ├── routes/
│   │   └── users.ts         # User API endpoints
│   └── tests/
│       ├── helpers/
│       │   └── dbTestUtils.ts # Test utilities
│       └── users.test.ts    # API route tests
├── docs/
│   ├── USER_SCHEMA.md       # Database schema documentation
│   └── SEEDING_GUIDE.md     # Data seeding instructions
├── db/
│   ├── migrations/          # Database migrations
│   └── seeds/              # Sample data scripts
└── tasks/                  # Sprint planning documents
```

## Documentation

- [`docs/USER_SCHEMA.md`](docs/USER_SCHEMA.md) - Database schema and RLS policies
- [`docs/SEEDING_GUIDE.md`](docs/SEEDING_GUIDE.md) - Data seeding for testing
- [`tasks/`](tasks/) - Sprint planning and task breakdowns
