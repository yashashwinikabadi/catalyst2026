const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataDirectory = path.join(__dirname, '../../data');
const dataFile = path.join(dataDirectory, 'helpRequests.json');

const ensureStorage = () => {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([], null, 2));
  }
};

const readRequests = () => {
  ensureStorage();
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
};

const saveRequests = (requests) => {
  ensureStorage();
  fs.writeFileSync(dataFile, JSON.stringify(requests, null, 2));
};

// Get all help requests
router.get('/', (req, res, next) => {
  try {
    const requests = readRequests();

    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    next(error);
  }
});

// Create a help request
router.post('/', (req, res, next) => {
  try {
    const { requestedBy, message, urgency } = req.body;

    if (!requestedBy?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'The requester name is required.'
      });
    }

    const request = {
      id: `help_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      requestedBy: requestedBy.trim(),
      message: message?.trim() || 'Assistance requested.',
      urgency: urgency || 'Normal',
      status: 'Open',
      createdAt: new Date().toISOString()
    };

    const requests = readRequests();
    requests.unshift(request);
    saveRequests(requests);

    res.status(201).json({
      success: true,
      message: 'Help request recorded successfully.',
      data: request
    });
  } catch (error) {
    next(error);
  }
});

// Mark a help request as resolved
router.post('/:id/resolve', (req, res, next) => {
  try {
    const requests = readRequests();
    const request = requests.find((item) => item.id === req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Help request not found.'
      });
    }

    request.status = 'Resolved';
    request.resolvedAt = new Date().toISOString();

    saveRequests(requests);

    res.json({
      success: true,
      message: 'Help request marked as resolved.',
      data: request
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;