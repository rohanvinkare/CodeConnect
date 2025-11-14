# CodeConnect — Full project README

**CodeConnect** — a polished, neon-themed interview platform for 1-on-1 live coding: editor + video + chat + secure code execution. This README contains everything you need to run, develop, test, and deploy the full stack (frontend + backend).

---

# ✨ Highlights

* 🧑‍💻 VSCode-powered Monaco editor (multi-language)
* 🔐 Authentication with Clerk
* 🎥 1-on-1 Video interview rooms (Stream)
* 🧭 Dashboard with live stats & active sessions
* 🔊 Mic & camera toggles, screen sharing, recording support (Stream)
* 💬 Real-time chat messaging (Stream Chat)
* ⚙️ Secure code execution in an isolated Piston (or similar) service
* 🎯 Auto feedback (success/fail) based on problem test cases
* 🎉 Confetti on success + toast notifications on failures
* 🧩 Practice problems page (solo mode)
* 🔒 Room locking — 2 participants max
* 🧠 Background jobs via Inngest for async tasks
* 🧰 REST API built with Node.js + Express
* ⚡ Data fetching & caching via TanStack Query
* 🤖 CodeRabbit for PR analysis & code optimization (integration)
* 🧑‍💻 Git & GitHub workflow (branches → PR → review → merge)
* 🚀 Deployment-friendly: target Sevalla (or any container host)

---

# 🏗 Project layout (recommended)

```
/backend
  /src
    /controllers
    /routes
    /services
    /workers
    /models
  package.json
  .env
/frontend
  /src
    /components
    /pages
    /hooks
    /lib
    /styles
  package.json
  vite.config.js
  .env

README.md
```

---

# 🛠 Tech stack

* Frontend: React (Vite), TailwindCSS, DaisyUI (minimal), Monaco Editor (Monaco), react-query (TanStack Query), Clerk (auth), Stream (video/chat)
* Backend: Node.js, Express, Mongoose (MongoDB), Inngest (jobs), Piston or dedicated sandbox for code execution
* Realtime / Media: Stream Video & Stream Chat
* CI/CD: GitHub Actions (unit/linters/PR checks / build)
* Deployment: Docker / container; Sevalla or similar (supports Docker)
* Testing: Jest (backend), Vitest / Playwright (frontend e2e)
* Observability: Sentry, Prometheus (optional)
* Theme: **NeonMatrix** (project UI theme)

---

# 🔐 Environment — `.env` examples

## Backend (`/backend/.env`)

```bash
PORT=3000
NODE_ENV=development

DB_URL=your_mongodb_connection_url

INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

CLIENT_URL=http://localhost:5173
```

## Frontend (`/frontend/.env`)

```bash
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3000/api
VITE_STREAM_API_KEY=your_stream_api_key
```

> Keep secrets safe. Use your host's secrets manager for production.

---

# ▶️ Local development (quick start)

## Backend

```bash
cd backend
npm install
# create .env from example
npm run dev
```

The backend runs on `http://localhost:3000` by default (see .env).

## Frontend

```bash
cd frontend
npm install
# create .env from example
npm run dev
```

The frontend runs on `http://localhost:5173` by default (Vite).

---

# 🔁 Docker (optional)

Example `docker-compose.yml` (simplified):

```yaml
version: "3.8"
services:
  mongo:
    image: mongo:6
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"

  backend:
    build: ./backend
    env_file:
      - ./backend/.env
    ports:
      - "3000:3000"
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    env_file:
      - ./frontend/.env
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  mongo-data:
```

---

# 🔌 API Overview (representative)

> All endpoints prefixed with `/api` by default

### Auth

* `POST /api/auth/` — Clerk handles auth; backend verifies tokens
* Middleware: `requireAuth` extracts Clerk session

### Problems

* `GET /api/problems` — list problems
* `GET /api/problems/:id` — single problem

### Sessions (Rooms)

* `GET /api/sessions/active` — active sessions
* `POST /api/sessions` — create session (host)
* `GET /api/sessions/:id` — session detail
* `POST /api/sessions/:id/join` — join session (participant)
* `POST /api/sessions/:id/end` — end the session (host)

### Code Execution

* `POST /api/exec` — runs code in isolated sandbox (language, code, stdin)

  * returns `{ success, output, error }`
  * run in an isolated container or external service (Piston)

### Webhooks / Background

* `/api/webhooks/stream` — optional Stream webhooks
* Inngest endpoints for async jobs (reports, post-session tasks)

---


# 🎯 UX / Frontend design notes

* Theme name: **NeonMatrix** — navy black palette, subtle neon glows, glass panels
* Use a single global theme tokens file (colors, shadows, border radii)
* Editor: Monaco with custom `neonmatrix-dark` theme (navy background, soft blue cursors)
* Panels: Left problem scrolls independently; right editor + output have independent scroll
* Call Controls: leave unstyled override if Stream CSS hides icons — keep Stream-controlled call controls intact to ensure icons visible

---

# 📁 Useful dev commands

Frontend:

```bash
cd frontend
npm run dev        # start dev server
npm run build      # production build
npm run preview    # preview built app
```

Backend:

```bash
cd backend
npm run dev        # dev (nodemon)
npm run build
npm run start      # start production
```



---

# ✅ Contribution & workflow

1. Branch off `feature/<name>`
2. Open PR against `develop` (or `main` per your flow)
3. Run tests, add descriptive description and screenshots
4. Assign reviewers, squash & merge on approval


---

# 🙋 FAQ

**Q:** Can I run the code runner locally?
**A:** Yes — either run a local Piston instance or mock the executor for frontend dev.

**Q:** Is video encrypted?
**A:** Stream handles the media pipeline; make sure to review Stream’s security docs for encryption details.

**Q:** Where to change the NeonMatrix theme?
**A:** `frontend/src/styles/theme-neonmatrix.*` — contains color tokens, Tailwind config overrides and global CSS.

