# Lunatic Web – Front‑End (React + Vite)

Single‑page application for the Lunatic platform. Consumes the Lunatic REST API & WebSocket events built in the back‑end repo.

Built with **React 18**, **Vite 6**, **Tailwind CSS**, **MUI**, **React Router v6**, **react‑hook‑form**, and **Socket.IO client**.

---

## Table of contents

1. [Prerequisites](#prerequisites)
2. [Quick start](#quick-start)
3. [Environment variables](#environment-variables)
4. [Project structure](#project-structure)
5. [NPM scripts](#npm-scripts)
6. [Design system](#design-system)
7. [API layer](#api-layer)
8. [Build & deployment](#build--deployment)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- **Node.js ≥ 20** (LTS recommended)
- **PNPM 8** _or_ **NPM 10** (use what you prefer, the lock‑file is in `package-lock.json`)
- Running instance of the [Lunatic API](https://gitlab.com/your-team/lunatic-api) (defaults to **[http://localhost:4000](http://localhost:4000)**).

---

## Quick start

```bash
# 1. Clone & install deps
$ git clone <repo-url> lunatic-web && cd lunatic-web
$ npm install   # or pnpm install / yarn

# 2. Copy env template & adjust if needed
$ cp .env.example .env

# 3. Launch dev server (HMR on port 3010)
$ npm run dev
```

The SPA is now reachable at **[http://localhost:3010](http://localhost:3010)** with hot‑module reload.

---

## Environment variables

| Key                    | Default                         | Purpose                                                                |
| ---------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| `VITE_API_BASE_URL`    | `http://localhost:4000`         | Root URL for REST endpoints.                                           |
| `VITE_API_BARCODE_URL` | `http://localhost:4000`         | Endpoint that returns a _PNG/SVG_ barcode.                             |
| `VITE_APP_SECRET_KEY`  | `ulalakyakya`                   | Client‑side AES key (used by `crypto-js` for localStorage encryption). |
| `VITE_API_MEDIA_URL`   | `http://localhost:4000/public/` | Public asset host (images, documents). **Must** end with `/`.          |
| `VITE_API_SOCKET_URL`  | `http://localhost:4000`         | Socket.IO namespace for real‑time events.                              |

> **Note:** Vite exposes **only** variables prefixed with `VITE_` to the browser. Place additional private tokens in a server‑side proxy, not here.

### Creating a new env file

```bash
cp .env.example .env.local   # .gitignored by default
```

---

## Project structure

```
├── index.html                 # Single HTML shell
├── tailwind.config.js         # Tailwind design tokens
├── vite.config.js             # Vite settings (port 3010, React SWC)
├── src/
│   ├── main.jsx               # React root (createRoot)
│   ├── App.jsx                # Top‑level routes + providers
│   ├── assets/                # Static/svg/img
│   ├── components/            # Reusable UI blocks (Button, Modal, ...)
│   ├── pages/                 # Route‑level screens (Dashboard, Login…)
│   ├── services/
│   │   ├── api.js            # Axios instance with interceptors
│   │   └── Helper.js         # Global toast/error helpers
│   └── hooks/                 # Custom hooks (`useAuth`, `useFaq`, ...)
└── public/                    # Vite copies here verbatim at build time
```

Each **page** registers its route in `src/router.jsx`, while shared state lives in contexts under `src/contexts/`.

---

## NPM scripts

| Script    | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| `dev`     | Start dev server with HMR ([http://localhost:3010](http://localhost:3010)). |
| `build`   | Production bundle to `dist/` using Vite + esbuild.                          |
| `preview` | Serve the contents of `dist/` locally to verify build.                      |
| `lint`    | Run ESLint with Airbnb/React rules (no autofix).                            |

---

## Design system

- **Tailwind CSS** – atomic utility classes, plus custom palette defined in `tailwind.config.js`.
- **MUI (Material UI)** – complex components (DatePicker, Dialog, DataGrid).
- **framer‑motion** – page transitions & small micro‑interactions.
- **Untitled UI & IconPark** – iconography.

A small layer of _design tokens_ (colors, radii, spacing) is declared in Tailwind’s `theme.extend` so you can mix **utility‑first** and **component‑driven** approaches without conflict.

---

## API layer

- **axios** singleton created in `src/services/api.js` attaches the `Authorization: Bearer <token>` header and handles 401 refresh.
- Error handling pipes into `myToaster` (React‑Toastify) via `Helper.handleError` HOC.
- Real‑time updates come through **Socket.IO** (`src/services/socket.js`) and sync stores in the relevant page.

> **Tip** : When the back‑end and front‑end run on different origins in dev, CORS is already handled by the back‑end. No extra Vite proxy is required.

---

## Build & deployment

```bash
# Build for production
$ npm run build
# → Output: dist/ (~2 MB gzip) with hashed assets

# Static hosting example (Netlify/Cloudflare Pages)
$ netlify deploy --prod --dir=dist

# Docker (optional)
FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Remember to set `VITE_*` vars at **build time**; the compiled JS will inline them.

---

## Troubleshooting

| Symptom                                    | Fix                                                                                            |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| **Blank page after login**                 | Check that `VITE_API_*` vars point to the back‑end host reachable from the browser.            |
| **`socket.io-client` fails to connect**    | Ensure the back‑end is running with `cors({ origin: "*" })` or update `VITE_API_SOCKET_URL`.   |
| **ESLint “fast refresh is not enabled”**   | Disable VS Code’s ESLint plugin _or_ run `npm run lint` manually – the dev server handles HMR. |
| **Tailwind classes missing in prod build** | Verify `content` paths in `tailwind.config.js` include **all** component sub‑folders.          |

---
