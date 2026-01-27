import { app, server } from './app';
import { loadEnv } from './config';
import { prisma } from './config/prisma';
import { logger } from './shared/utils/logger';

loadEnv();

const port = Number(process.env.PORT) || 3000;
const bootstrap = async () => {
  await prisma.$connect();
  server.listen(port, () => {
    logger.info(`API listening on port ${port}`);
  });
};

bootstrap().catch((error) => {
  logger.error('Failed to start server', error);
  prisma.$disconnect().finally(() => process.exit(1));
});
