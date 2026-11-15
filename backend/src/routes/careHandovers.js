const express = require('express');
const router = express.Router();
const careHandoverService = require('../services/careHandoverService');

// Get all care handovers
router.get('/', async (req, res, next) => {
  try {
    const data = await careHandoverService.getAll();

    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    next(error);
  }
});

// Create a new care handover
router.post('/', async (req, res, next) => {
  try {
    const record = await careHandoverService.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Care handover created successfully.',
      data: record
    });
  } catch (error) {
    if (error.message.includes('required')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    next(error);
  }
});

// Acknowledge a care handover
router.post('/:id/acknowledge', async (req, res, next) => {
  try {
    const record = await careHandoverService.acknowledge(
      req.params.id,
      req.body.acknowledgedBy
    );

    res.json({
      success: true,
      message: 'Care handover acknowledged successfully.',
      data: record
    });
  } catch (error) {
    if (
      error.message.includes('required') ||
      error.message.includes('not found') ||
      error.message.includes('already been acknowledged')
    ) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    next(error);
  }
});

module.exports = router;