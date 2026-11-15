/**
 * Gemini AI Service Architecture Stub
 * Prepared for Google Gemini API integration.
 * Will initialize and interact with Gemini once valid credentials are provided.
 */
const config = require('../config/env');

class GeminiService {
  constructor() {
    this.isReady = config.gemini.isConfigured;
  }

  getStatus() {
    return {
      service: 'Google Gemini API',
      configured: this.isReady,
      status: this.isReady ? 'Ready' : 'Pending API Key configuration'
    };
  }

  async generateCaregiverSummary(elderData) {
    if (!this.isReady) {
      return {
        success: false,
        message: 'Gemini API is not configured yet. Set GEMINI_API_KEY in your environment.'
      };
    }
    // Architecture hook ready for @google/genai or REST call
    throw new Error('Gemini API client not yet initialized.');
  }
}

module.exports = new GeminiService();
