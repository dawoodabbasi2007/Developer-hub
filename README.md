# DevelopersHub — Full-Stack Agency Platform (Supabase Edition)

Built with **Next.js + Node.js/Express + Supabase (PostgreSQL)**

---

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS  |
| Backend  | Node.js + Express.js                    |
| Database | Supabase (PostgreSQL)                   |
| Auth     | Supabase Auth (JWT)                     |

---

## STEP 1 — Create Your Supabase Project

1. Go to https://supabase.com and sign up (free)
2. Click **"New Project"** → give it a name → set a DB password → Create
3. Wait ~1 minute for it to provision
4. Go to **Settings → API** and copy:
   - `Project URL`  → this is your `SUPABASE_URL`
   - `anon / public` key → this is your `SUPABASE_ANON_KEY`
   - `service_role` secret key → this is your `SUPABASE_SERVICE_ROLE_KEY`

---

## STEP 2 — Run the SQL Schema

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Open the file `supabase_schema.sql` from this project root
4. Copy the entire contents and paste into the SQL Editor
5. Click **Run** (or press Ctrl+Enter)
6. You should see all 5 tables created: services, portfolio, blogs, inquiries, meetings

---

## STEP 3 — Backend Setup

```bash
cd backend
npm install
```

Open `backend/.env` and fill in your Supabase values:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_ANON_KEY=your_anon_public_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_secret_key_here
```

Start the backend:
```bash
npm run dev
```

Backend runs at: http://localhost:5000

---

## STEP 4 — Create Your Admin Account

Send a POST request using Postman or Thunder Client (VS Code):

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Admin",
  "email": "admin@developershub.com",
  "password": "yourpassword123"
}
```

Do this ONCE only. Your admin is now in Supabase Auth.

---

## STEP 5 — Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:3000
Admin panel: http://localhost:3000/admin/login

---

## API Endpoints

All routes are identical — only the database layer changed.

| Method | Endpoint              | Auth   | Description           |
|--------|-----------------------|--------|-----------------------|
| POST   | /api/auth/register    | No     | Create admin (once)   |
| POST   | /api/auth/login       | No     | Admin login           |
| GET    | /api/auth/me          | Admin  | Get current user      |
| GET    | /api/services         | No     | Active services       |
| GET    | /api/services/all     | Admin  | All services          |
| POST   | /api/services         | Admin  | Create service        |
| PUT    | /api/services/:id     | Admin  | Update service        |
| DELETE | /api/services/:id     | Admin  | Delete service        |
| GET    | /api/portfolio        | No     | Active portfolio      |
| GET    | /api/portfolio/all    | Admin  | All portfolio         |
| GET    | /api/portfolio/:id    | No     | Single item           |
| POST   | /api/portfolio        | Admin  | Create item           |
| PUT    | /api/portfolio/:id    | Admin  | Update item           |
| DELETE | /api/portfolio/:id    | Admin  | Delete item           |
| GET    | /api/blog             | No     | Published blogs       |
| GET    | /api/blog/all         | Admin  | All blogs             |
| GET    | /api/blog/:id         | No     | Single blog           |
| POST   | /api/blog             | Admin  | Create blog           |
| PUT    | /api/blog/:id         | Admin  | Update blog           |
| DELETE | /api/blog/:id         | Admin  | Delete blog           |
| POST   | /api/inquiries        | No     | Submit inquiry        |
| GET    | /api/inquiries        | Admin  | All inquiries         |
| PUT    | /api/inquiries/:id    | Admin  | Update status         |
| DELETE | /api/inquiries/:id    | Admin  | Delete                |
| POST   | /api/meetings         | No     | Book meeting          |
| GET    | /api/meetings         | Admin  | All meetings          |
| PUT    | /api/meetings/:id     | Admin  | Update status         |
| DELETE | /api/meetings/:id     | Admin  | Delete                |

---

## Deployment

### Backend → Render.com
- Build: `npm install`
- Start: `node server.js`
- Add all 3 Supabase env vars + `CLIENT_URL` + `PORT`

### Frontend → Vercel.com
- Framework: Next.js (auto-detected)
- Add env var: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api`
