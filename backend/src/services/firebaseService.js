/**
 * Firebase Authentication & Cloud Firestore Service Architecture Stub
 * Prepared for Firebase Admin SDK integration.
 * Will initialize and interact with Firestore and Auth once valid credentials are provided.
 */
const config = require('../config/env');

class FirebaseService {
  constructor() {
    this.isReady = config.firebase.isConfigured;
  }

  getStatus() {
    return {
      service: 'Firebase Auth & Cloud Firestore',
      configured: this.isReady,
      status: this.isReady ? 'Ready' : 'Pending Firebase service account credentials'
    };
  }

  async verifyToken(idToken) {
    if (!this.isReady) {
      return {
        authenticated: false,
        message: 'Firebase is not configured yet. Set Firebase credentials in .env.'
      };
    }
    // Architecture hook ready for admin.auth().verifyIdToken(idToken)
    throw new Error('Firebase Auth client not yet initialized.');
  }
}

module.exports = new FirebaseService();
