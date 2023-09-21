import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { Server } from 'http';
import { logger } from './shared/logger';

// handle uncaught exception
process.on('uncaughtException', error => {
  logger.error(error);
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database connected successfully');

    server = app.listen(config.port, () => {
      logger.info(`Application app listening on port~ ${config.port}`);
    });
  } catch (error) {
    logger.info('Failed to connect to Database: ' + error);
  }

  // handle uncaught rejections
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        logger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

// handle error with SIGTERM
process.on('SIGTERM', () => {
  logger.info('SIGTERM is detected');
  if (server) {
    server.close();
  }
});
