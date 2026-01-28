# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SCORIS-Overlay is a tournament stream overlay application built as a monorepo with a Vue 3 frontend and NestJS backend. The application provides tournament management functionality with OAuth authentication (Discord and Google) and real-time stream overlays.

## Repository Structure

This is a monorepo containing two main applications:

- **`/client`** - Vue 3 + TypeScript frontend with Vite
- **`/server`** - NestJS backend with TypeORM and PostgreSQL

## Common Development Commands

### Root Level
```bash
# Install all dependencies
npm install

# Run both client and server in parallel
npm run dev

# Run only client (port 8080)
npm run client

# Run only server (port 3000)
npm run server
```

### Client (`/client` directory)
```bash
# Development server with hot reload
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview

# Format code
npm run format
```

### Server (`/server` directory)
```bash
# Development with watch mode
npm run start:dev

# Production mode
npm run start:prod

# Build
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Test coverage
npm run test:cov

# Lint and fix
npm run lint

# Format code
npm run format

# TypeORM CLI
npm run typeorm

# Import production database to local Docker
npm run db:import
```

### Database (requires Docker)
```bash
# Start PostgreSQL database
cd server
docker-compose up -d

# Stop database
docker-compose down
```

## Architecture

### Authentication Flow

The application uses OAuth2 with JWT tokens:

1. **Client initiates login** - User clicks login button which redirects to `/auth/discord` or `/auth/google` on the backend
2. **OAuth callback** - Backend validates OAuth provider response using Passport strategies (`server/src/auth/strategies/`)
3. **User creation/update** - `AuthService` either creates a new user or updates existing user data in PostgreSQL
4. **JWT generation** - Backend signs a JWT containing user data and redirects to client's `/auth/callback` with `jwt` and `access_token` query parameters
5. **Client storage** - Client stores JWT and user data in localStorage via auth store (`client/src/stores/auth.ts`)
6. **API requests** - Axios interceptor (`client/src/services/api.ts`) automatically attaches JWT to Authorization header for authenticated requests
7. **Token validation** - Backend uses JWT strategy (`server/src/auth/strategies/jwt.strategy.ts`) and guards to protect routes

### Backend Architecture (NestJS)

The server follows NestJS modular architecture:

- **Modules**: `UsersModule`, `AuthModule`, `TournamentModule` (in `server/src/app.module.ts`)
- **Database**: TypeORM with PostgreSQL, configured in `server/src/app.module.ts` and `server/src/db/data-source.ts`
- **Entities**: TypeORM entities in `*/entities/*.entity.ts` files
- **DTOs**: Data Transfer Objects in `*/dto/*.dto.ts` for validation
- **Guards**: JWT authentication guards in `server/src/auth/guards/`
- **Decorators**: Custom decorators like `@CurrentUser()` in `server/src/auth/decorators/`

Key patterns:
- TypeORM `synchronize` is enabled in non-production environments for automatic schema updates
- CORS is enabled for all origins in development (`server/src/main.ts`)
- Environment variables are loaded via `@nestjs/config`

### Frontend Architecture (Vue 3)

The client uses modern Vue 3 features:

- **State Management**: Pinia stores (`client/src/stores/`) for auth and theme state
- **Routing**: Vue Router with modular route files (`client/src/router/`)
- **API Client**: Axios instance with interceptors in `client/src/services/api.ts`
- **Auth Plugin**: Global auth initialization via Vue plugin (`client/src/plugins/auth.ts`)
- **UI Framework**: Naive UI components (imported as needed)
- **Styling**: Tailwind CSS v4 via Vite plugin
- **Type Safety**: Full TypeScript with type definitions in `client/src/types/`

Key patterns:
- Services layer (`client/src/services/`) wraps API calls for specific features
- Auth state initializes on app mount and persists to localStorage
- Route guards can be added via router for protected routes
- Theme support via dedicated store (`client/src/stores/themes.ts`)

### Environment Variables

**Server** requires `.env` file in `/server` directory:
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=scoris
PUBLIC_CLIENT_URL=http://localhost:8080
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
PORT=3000
NODE_ENV=development
```

**Client** requires `.env` file in `/client` directory:
```
VITE_API_URL=http://localhost:3000
```

## Development Notes

- The project uses **Node 22.x** and **Yarn 1.x** (specified in `server/package.json` engines)
- TypeScript is used throughout both client and server
- Client uses `@` alias for `./src` directory (configured in `vite.config.ts`)
- Database migrations are located in `server/src/db/migrations/` but no migrations exist yet (schema managed by TypeORM synchronize)
- Server uses `yarn` but root and client use `npm` - be mindful of which package manager to use in which directory

## Internationalization (i18n)

The client supports multiple languages using **vue-i18n v11**:
- **Languages:** English (`en`) and Brazilian Portuguese (`pt-BR`)
- **Files:** Translation files in `client/src/locales/`
- **Usage:** Use `const { t } = useI18n()` and `{{ t('key.name') }}` in templates
- **Auto-detection:** Automatically detects browser language and persists user preference
- **Documentation:** See `client/I18N.md` for complete guide

When adding new features with user-facing text, always add translations to both `en.ts` and `pt-BR.ts` files.

## Testing

- Server tests use Jest with TypeScript support
- Test files follow `*.spec.ts` naming convention
- E2E tests configured in `server/test/jest-e2e.json`
- No frontend tests are currently configured

## Deployment Considerations

- Set `NODE_ENV=production` for production deployments
- Disable TypeORM `synchronize` in production (use migrations instead)
- Configure proper CORS origins in `server/src/main.ts`
- Build client with `npm run build` and serve from `/dist` directory
- Ensure all environment variables are properly configured in production
