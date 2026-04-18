# DevelopersHub — Full-Stack Agency Platform

One folder. One `npm run dev`. One Vercel deployment.
Built with **Next.js 14 + Supabase (PostgreSQL)**.

---

## Structure

```
developershub/
├── app/
│   ├── api/           ← All backend API routes (built into Next.js)
│   │   ├── auth/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── blog/
│   │   ├── inquiries/
│   │   └── meetings/
│   ├── admin/         ← Admin panel pages
│   └── (public pages) ← Home, About, Services, Portfolio, Blog, Contact, Booking
├── components/        ← Navbar, Footer, AdminSidebar, ProtectedRoute
├── context/           ← AuthContext
├── lib/               ← Supabase client, Axios instance, Auth middleware
├── .env.local         ← Your Supabase keys go here
└── package.json
```

---

## Setup (Local)

### Step 1 — Supabase

1. Go to https://supabase.com → create free project
2. Go to **SQL Editor** → paste `supabase_schema.sql` → Run
3. Go to **Settings → API** → copy your 3 keys

### Step 2 — Environment Variables

Open `.env.local` and fill in:

```env
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Step 3 — Install & Run

```powershell
cd "C:\Users\Abdullah\Desktop\Developer hub"
npm install
npm run dev
```

Open http://localhost:3000

### Step 4 — Create Admin Account (once only)

Using Postman or Thunder Client:

```
POST http://localhost:3000/api/auth
Body: { "action": "register", "name": "Admin", "email": "your@email.com", "password": "yourpassword" }
```

Then log in at http://localhost:3000/admin/login

---

## Deploy to Vercel (One Click)

1. Push this folder to GitHub
2. Go to vercel.com → New Project → Import repo
3. Add all 4 environment variables from `.env.local`
4. Click Deploy

That's it. No separate backend server needed.

---

## API Endpoints

| Method | URL                      | Auth   | Description         |
|--------|--------------------------|--------|---------------------|
| POST   | /api/auth                | No     | login or register   |
| GET    | /api/auth                | Admin  | get current user    |
| GET    | /api/services            | No     | active services     |
| GET    | /api/services/all        | Admin  | all services        |
| POST   | /api/services            | Admin  | create service      |
| PUT    | /api/services/:id        | Admin  | update service      |
| DELETE | /api/services/:id        | Admin  | delete service      |
| GET    | /api/portfolio           | No     | active portfolio    |
| GET    | /api/portfolio/all       | Admin  | all portfolio       |
| POST   | /api/portfolio           | Admin  | create item         |
| PUT    | /api/portfolio/:id       | Admin  | update item         |
| DELETE | /api/portfolio/:id       | Admin  | delete item         |
| GET    | /api/blog                | No     | published blogs     |
| GET    | /api/blog/all            | Admin  | all blogs           |
| GET    | /api/blog/:id            | No     | single blog         |
| POST   | /api/blog                | Admin  | create blog         |
| PUT    | /api/blog/:id            | Admin  | update blog         |
| DELETE | /api/blog/:id            | Admin  | delete blog         |
| POST   | /api/inquiries           | No     | submit contact form |
| GET    | /api/inquiries           | Admin  | all inquiries       |
| PUT    | /api/inquiries/:id       | Admin  | update status       |
| DELETE | /api/inquiries/:id       | Admin  | delete              |
| POST   | /api/meetings            | No     | book meeting        |
| GET    | /api/meetings            | Admin  | all meetings        |
| PUT    | /api/meetings/:id        | Admin  | update status       |
| DELETE | /api/meetings/:id        | Admin  | delete              |
