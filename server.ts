import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import app from './app';

const PORT = Number(process.env.PORT) || 3000;

// Setup Vite development middleware or production static serving.
// This entry point is only used for local dev/start (`npm run dev`,
// `npm start`) — it runs a real long-lived Node process. On Vercel,
// `api/index.ts` imports the same `app` directly as a serverless function
// instead, and Vercel's CDN serves the static `dist/` build, so this
// bootstrap is skipped entirely there.
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[LitNuke X ANUMA] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
