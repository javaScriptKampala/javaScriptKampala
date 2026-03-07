import { getPayload } from 'payload';
import config from './payload.config';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) || 3002;

const start = async (): Promise<void> => {
  const payload = await getPayload({ config });

  const { default: express } = await import('express');
  const app = express();

  app.listen(PORT, () => {
    payload.logger.info(`CMS server running on http://localhost:${PORT}`);
  });
};

void start();
