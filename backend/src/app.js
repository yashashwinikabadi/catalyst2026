/**
 * Express Application Configuration
 */
const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/health');
const apiRoutes = require('./routes/api');
const medicationRoutes = require('./routes/medications');
const careHandoverRoutes = require('./routes/careHandovers');
const helpRequestRoutes = require('./routes/helpRequests');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/env');

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow frontend during initial local development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/health', healthRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/care-handovers', careHandoverRoutes);
app.use('/api/help-requests', helpRequestRoutes);
app.use('/api', apiRoutes);

// Root route for quick verification
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SAANIDHYA Backend API',
    tagline: 'Together in care. Independent in life.',
    healthEndpoint: '/health',
    infoEndpoint: '/api/info'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route not found: ${req.method} ${req.originalUrl}`
    }
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
