# Sparsh Braille Trust — Landing Page

A single-page React site for Sparsh Braille Trust, built with [Vite](https://vitejs.dev/).

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # optional, preview the production build locally
```

The build output goes to `dist/`.

## Deploy on Vercel

1. Push this folder to a new GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects the Vite framework preset — no extra config needed:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**.

Every subsequent push to the main branch will auto-deploy.
