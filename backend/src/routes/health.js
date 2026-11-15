/**
 * Health Check Route
 * Endpoint: GET /health
 */
const express = require('express');
const router = express.Router();
const config = require('../config/env');
const geminiService = require('../services/geminiService');
const firebaseService = require('../services/firebaseService');

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    product: 'SAANIDHYA',
    tagline: 'Together in care. Independent in life.',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: config.nodeEnv,
    services: {
      gemini: geminiService.getStatus(),
      firebase: firebaseService.getStatus()
    }
  });
});

module.exports = router;
