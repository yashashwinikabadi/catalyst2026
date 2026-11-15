/**
 * Environment configuration module
 * Loads and validates environment variables cleanly without hardcoding any secrets.
 */
require('dotenv').config();

const config = {
  port: parseInt(process.env.PORT || '8080', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Architecture readiness checks (secrets are NOT hardcoded)
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || null,
    isConfigured: Boolean(process.env.GEMINI_API_KEY)
  },

  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || null,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || null,
    privateKey: process.env.FIREBASE_PRIVATE_KEY || null,
    isConfigured: Boolean(
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
    )
  }
};

module.exports = config;
