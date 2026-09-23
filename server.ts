import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API to get the backend Code.gs content for developer
  app.get('/api/backend-code', (_req, res) => {
    try {
      const codePath = path.join(process.cwd(), 'Code.gs');
      const code = fs.readFileSync(codePath, 'utf-8');
      res.json({ code });
    } catch (error) {
      res.status(500).json({ error: 'Failed to read Code.gs' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve static files from 'dist' or fallback to 'docs'
    const distPath = fs.existsSync(path.join(process.cwd(), 'dist'))
      ? path.join(process.cwd(), 'dist')
      : path.join(process.cwd(), 'docs');
    
    // Serve static assets with caching
    app.use(express.static(distPath, {
      maxAge: '1d',
      index: false
    }));

    // Fallback all other routes to index.html for SPA routing
    app.get('*', (_req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Build artifacts not found. Please run "npm run build" first.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SERVER] SHE Academy started on port ${PORT}`);
    console.log(`[SERVER] Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();
