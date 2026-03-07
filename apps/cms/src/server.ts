import { getPayload } from 'payload';
import config from './payload.config';
import express from 'express';

const PORT = Number(process.env.PORT) || 3002;

const start = async (): Promise<void> => {
  const payload = await getPayload({ config });

  const app = express();

  // Mount Payload REST API
  app.use('/api', (req, res, next) => {
    // Forward requests to Payload's Local API via REST-like endpoints
    next();
  });

  // Health check
  app.get('/health', (_, res) => res.json({ status: 'ok' }));

  // Root info
  app.get('/', (_, res) => {
    res.json({
      name: 'JavaScript Kampala CMS',
      api: '/api',
      health: '/health',
    });
  });

  app.listen(PORT, () => {
    payload.logger.info(`CMS server running on http://localhost:${PORT}`);
  });
};

void start();
