/**
 * Server entry point
 */
const app = require('./src/app');
const config = require('./src/config/env');

const server = app.listen(config.port, () => {
  console.log('----------------------------------------------------');
  console.log(`🌿 SAANIDHYA Backend running on port ${config.port}`);
  console.log(`🌱 Health check: http://localhost:${config.port}/health`);
  console.log(`🌱 API info:     http://localhost:${config.port}/api/info`);
  console.log(`🌐 Environment:  ${config.nodeEnv}`);
  console.log('----------------------------------------------------');
});

// Graceful shutdown handling for Cloud Run & container environments
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
