-- ============================================================
--  DevelopersHub — Supabase PostgreSQL Schema
--  Paste this entire file into:
--  Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================


-- ── 1. SERVICES ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT        NOT NULL,
  description TEXT        NOT NULL,
  icon        TEXT        DEFAULT '',
  features    TEXT[]      DEFAULT '{}',
  is_active   BOOLEAN     DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ── 2. PORTFOLIO ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS portfolio (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT        NOT NULL,
  description  TEXT        NOT NULL,
  image        TEXT        DEFAULT '',
  category     TEXT        DEFAULT 'Web Development',
  technologies TEXT[]      DEFAULT '{}',
  live_url     TEXT        DEFAULT '',
  github_url   TEXT        DEFAULT '',
  is_active    BOOLEAN     DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);


-- ── 3. BLOGS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blogs (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT        NOT NULL,
  slug         TEXT        UNIQUE,
  content      TEXT        NOT NULL,
  summary      TEXT        DEFAULT '',
  image        TEXT        DEFAULT '',
  author       TEXT        DEFAULT 'Admin',
  tags         TEXT[]      DEFAULT '{}',
  is_published BOOLEAN     DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);


-- ── 4. INQUIRIES ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inquiries (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  phone      TEXT        DEFAULT '',
  subject    TEXT        DEFAULT '',
  message    TEXT        NOT NULL,
  status     TEXT        DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ── 5. MEETINGS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS meetings (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  phone      TEXT        DEFAULT '',
  date       TEXT        NOT NULL,
  time       TEXT        NOT NULL,
  topic      TEXT        DEFAULT '',
  status     TEXT        DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ── ROW LEVEL SECURITY (RLS) ───────────────────────────────
-- We use the service_role key on the backend, which bypasses RLS.
-- But it's good practice to enable RLS and lock tables down.

ALTER TABLE services   ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio  ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs      ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries  ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings   ENABLE ROW LEVEL SECURITY;

-- Allow anyone to READ active services (public frontend)
CREATE POLICY "Public can read active services"
  ON services FOR SELECT
  USING (is_active = TRUE);

-- Allow anyone to READ active portfolio items
CREATE POLICY "Public can read active portfolio"
  ON portfolio FOR SELECT
  USING (is_active = TRUE);

-- Allow anyone to READ published blogs
CREATE POLICY "Public can read published blogs"
  ON blogs FOR SELECT
  USING (is_published = TRUE);

-- Allow anyone to INSERT inquiries (contact form)
CREATE POLICY "Anyone can submit inquiry"
  ON inquiries FOR INSERT
  WITH CHECK (TRUE);

-- Allow anyone to INSERT meetings (booking form)
CREATE POLICY "Anyone can book meeting"
  ON meetings FOR INSERT
  WITH CHECK (TRUE);

-- NOTE: All other operations (admin reads, updates, deletes)
-- are handled by the service_role key which bypasses RLS entirely.
-- This is safe because service_role is only used server-side.


-- ── SEED DATA (optional — remove if you want to start empty) ──

INSERT INTO services (title, description, icon, features, is_active) VALUES
(
  'Web Development',
  'We build modern, responsive, and scalable web applications from scratch using the latest technologies.',
  '🖥️',
  ARRAY['React / Next.js Frontend', 'Node.js / Express Backend', 'PostgreSQL / MongoDB Database', 'REST API Design', 'Deployment & Hosting'],
  TRUE
),
(
  'UI/UX Design',
  'We craft beautiful, user-centered interfaces that convert visitors into customers.',
  '🎨',
  ARRAY['Wireframing & Prototyping', 'Figma Design', 'Responsive Layouts', 'Design System Creation', 'User Testing'],
  TRUE
),
(
  'API Development',
  'Robust, secure, and well-documented REST APIs that power your applications.',
  '⚡',
  ARRAY['RESTful API Design', 'JWT Authentication', 'Rate Limiting', 'API Documentation', 'Third-party Integrations'],
  TRUE
);


-- ── VERIFY ─────────────────────────────────────────────────
-- Run this to confirm all tables were created:
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
