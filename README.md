# CareerDock

AI Career Roadmap & Recruitment Platform built with Next.js 15, MongoDB, Mongoose, Auth.js, Tailwind CSS, Zustand, Recharts, dnd-kit, Framer Motion, GSAP-ready structure, and React Three Fiber.

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run seed
npm run dev
```

Local MongoDB example:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/careerdock
```

Open http://localhost:3000.

## Demo Users

After running `npm run seed`:

- Admin: `admin@careerdock.ai` / `CareerDock@123`
- HR: `hr@careerdock.ai` / `CareerDock@123`
- Job seeker: `seeker@careerdock.ai` / `CareerDock@123`

## Production Setup

Required environment variables are documented in `.env.example`. For Vercel, add the same variables in Project Settings, connect MongoDB Atlas, and set `NEXTAUTH_URL` to your deployed domain.

## What Is Included

- Role based Auth.js authentication with JWT sessions
- Protected middleware for Admin, HR, and Job Seeker areas
- MongoDB/Mongoose schemas for users, companies, jobs, applications, roadmaps, resumes, notifications, activity logs, interviews, progress, and resources
- Admin analytics dashboard with Recharts and roadmap management
- Job seeker 3D career world with React Three Fiber
- Job search, application flow, profile, resume analyzer, ATS score, and skill matching
- HR dashboard, job creation wizard, and dnd-kit ATS Kanban board
- Email service abstraction using Nodemailer
- Notification service with database backed realtime polling hook
- Cloudinary upload signature endpoint
- Docker, Vercel config, and GitHub Actions CI

## MongoDB Atlas

1. Create an Atlas cluster.
2. Add a database user and allow your IP address.
3. Set `MONGODB_URI` to the Atlas connection string with `/careerdock` at the end.
4. Run `npm run seed` once to create demo users and sample content.

## Vercel Deployment

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Add environment variables from `.env.example`.
4. Set `NEXTAUTH_URL` to your Vercel production URL.
5. Deploy.

## Docker

```bash
docker compose up --build
```

## Next Steps For Production

- Replace demo fallback data with strict database-only screens.
- Add a persistent Socket.io or Pusher service if you need push notifications instead of polling.
- Connect Cloudinary unsigned upload UI or AWS S3 presigned uploads.
- Add E2E tests for auth, apply flow, ATS drag, and roadmap editing.
