# Tourist Comfort Finder

Tourist Comfort Finder is a premium travel web platform for choosing the most convenient area to stay in a city. It includes city and neighborhood guides, a weighted recommendation engine, interactive maps, budget planning, itineraries, saved plans, comparison views, and a protected admin dashboard.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- NextAuth
- Zod
- React Hook Form
- TanStack Query
- Leaflet
- Recharts
- Framer Motion

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
copy .env.example .env
```

3. Set `DATABASE_URL`, `NEXTAUTH_SECRET`, and the demo account credentials in `.env`.

## Database

The repository includes a PostgreSQL Prisma schema and an initial migration in `prisma/migrations/0001_init`.

Run Prisma migration commands when targeting PostgreSQL:

```bash
npm run db:migrate
```

Generate the client if needed:

```bash
npm run prisma:generate
```

Seed the demo dataset:

```bash
npm run db:seed
```

## Run

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

## Test

Run type checks:

```bash
npm run typecheck
```

Run lint:

```bash
npm run lint
```

Run unit and smoke tests:

```bash
npm test
```

## Deployment Notes

- Configure a PostgreSQL database and set `DATABASE_URL`.
- Set a strong `NEXTAUTH_SECRET` in production.
- Run migrations before starting the app.
- Seed the demo data once on initial deployment if you want the bundled city and neighborhood content.
- The app is structured for App Router deployments and works cleanly with standard Next.js hosting targets.
