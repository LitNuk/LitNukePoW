import app from '../app.js';

// Vercel treats a default-exported Express app as a request handler and
// invokes it per-request as a serverless function. No app.listen() here —
// Vercel's own runtime handles the actual listening/routing.
export default app;
