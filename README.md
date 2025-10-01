# AI Learning Platform

A Next.js-based AI tutoring platform with student progress tracking and instructor analytics.

## Sprint 1 Status ✅

**Engineer 9 Deliverables:**
- ✅ Postgres schema for users (student/admin)
- ✅ Auth provider → DB sync (Clerk integration stubs)
- ✅ API tests for user flows (Jest + Supertest)

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

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Clerk Auth (Sprint 1 stubs)
CLERK_JWT_ISSUER="https://your-clerk-domain.clerk.accounts.dev"
CLERK_JWK_URL="https://your-clerk-domain.clerk.accounts.dev/.well-known/jwks.json"

# AI Chat Integration
OPENAI_API_KEY="sk-your-openai-api-key-here"
```

## Setup Instructions

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd ai-learning-tool
   npm install
   ```

2. **Database Setup**
   ```bash
   # Run the migration in your PostgreSQL database
   # Copy and execute the contents of: db/migrations/20250925_add_profiles_columns.sql
   ```

3. **Seed Database** (Optional)
   ```bash
   # See docs/SEEDING_GUIDE.md for detailed instructions
   # Execute the seed script: db/seeds/profiles_seed.sql
   ```

4. **Run Tests**
   ```bash
   npm test
   # Tests use mock database for Sprint 1 - no real DB connection required
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

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

## Sprint 1 Definition of Done ✅

- ✅ Profiles schema live in database and documented
- ✅ API route stubs exist with 3 endpoints
- ✅ Jest test suite with 10 passing tests demonstrating RLS behavior
- ✅ Mock database system for Sprint 1 testing
- ✅ Documentation updated for local development setup

## Next Steps (Sprint 2)

- Replace Clerk auth stubs with full integration
- Connect to real database in tests
- Add chat interface and LLM integration
- Implement instructor analytics dashboard

## Documentation

- [`docs/USER_SCHEMA.md`](docs/USER_SCHEMA.md) - Database schema and RLS policies
- [`docs/SEEDING_GUIDE.md`](docs/SEEDING_GUIDE.md) - Data seeding for testing
- [`tasks/`](tasks/) - Sprint planning and task breakdowns

## Contributing

1. Run tests: `npm test`
2. Check linting: `npm run lint`
3. All tests must pass before merging
4. Follow the established patterns in `api/routes/` and `api/tests/`
