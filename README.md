# 🧑‍💻 Natanael Vine Djapri — Portfolio

**Portfolio** is a personal portfolio site for **Natanael Vine Djapri**, an Informatics Engineering student at Tarumanagara University. It showcases projects, work/organization experience, and certifications, all editable through a login-gated admin dashboard instead of hardcoded files.

> 🧩 Content lives in Supabase and is managed through `/dashboard` — no redeploy needed to update a project, add a certification, or tweak the bio.

---

## 🧱 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Motion (Framer Motion), Lenis (smooth scroll) |
| **3D** | React Three Fiber, drei, Rapier (physics) — the draggable ID-badge lanyard |
| **Backend** | Supabase (Postgres, Auth, Storage) |
| **Hosting** | Vercel |

---

## ⚙️ Installation & Setup Guide

### 🪄 Prerequisites

Make sure all the following are ready:

| Tool | Description |
|------|--------------|
| 🟩 [Node.js 20+](https://nodejs.org/) | Runtime for Next.js |
| 📦 npm | Package manager (ships with Node.js) |
| ⚡ [Supabase account](https://supabase.com/) | Database, auth, and image storage backend |
| 🧭 [Git](https://git-scm.com/) | Version control system |

---

### 🔧 Step 1 — Clone the Repository
```bash
git clone https://github.com/NatanaelVineDjapri/Natanael-Vine-Djapri.git
cd Natanael-Vine-Djapri
```

### 📦 Step 2 — Install Dependencies
```bash
npm install
```

### 🗄️ Step 3 — Setup Supabase

```bash
# 1. Create a new project at supabase.com
# 2. Open the SQL Editor and run supabase/seed.sql
#    (creates the content tables + seeds them with the current data)
# 3. Run supabase/storage.sql
#    (creates the "images" bucket used by the dashboard's upload UI)
# 4. Authentication -> Users -> add your one admin login
# 5. Authentication -> Sign In / Providers -> disable public sign-ups
# 6. Project Settings -> API -> copy the Project URL and anon/publishable key
```

### 🔑 Step 4 — Environment Variables
```bash
# Copy the example file and fill in the two values from Step 3
cp .env.example .env.local
```
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### ▶️ Step 5 — Run the Dev Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site, or [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to sign in and manage content.

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

---

## 🗂️ Structure

| Path | Purpose |
|------|----------|
| `src/app/(site)` | Public routes — home, projects list/detail, about, contact |
| `src/app/dashboard` | Login-gated admin CRUD for profile/projects/experience/certifications |
| `src/lib/supabase` | Browser, server, and middleware Supabase clients |
| `src/lib/data` | Cached read functions the public site fetches content through |
| `src/components` | UI, layout, motion, chrome, lanyard, and dashboard components |
| `supabase/` | `seed.sql` (schema + content) and `storage.sql` (image bucket) |
| `public/` | Static images, resume PDF, 3D badge model |
