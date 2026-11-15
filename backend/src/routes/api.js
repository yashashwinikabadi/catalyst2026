/**
 * Base API Router
 * Endpoints for SAANIDHYA Core API
 */
const express = require('express');
const router = express.Router();
const geminiService = require('../services/geminiService');
const firebaseService = require('../services/firebaseService');

router.get('/info', (req, res) => {
  res.json({
    name: 'SAANIDHYA Backend API',
    tagline: 'Together in care. Independent in life.',
    version: '1.0.0',
    capabilities: [
      'Elderly health & routine monitoring',
      'Caregiver & family alerts',
      'Emergency SOS trigger architecture',
      'Gemini AI Care Insights (prepared)',
      'Firebase Cloud Firestore sync (prepared)'
    ],
    architecture: {
      gemini: geminiService.getStatus(),
      firebase: firebaseService.getStatus()
    }
  });
});

module.exports = router;
