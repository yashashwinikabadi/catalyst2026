/**
 * Medication API Routes
 * Endpoints for managing and tracking elder medications
 */
const express = require('express');
const router = express.Router();
const medicationService = require('../services/medicationService');

// GET /api/medications - Retrieve all medications
router.get('/', async (req, res, next) => {
  try {
    const list = await medicationService.getAll();
    res.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/medications/:id - Retrieve specific medication
router.get('/:id', async (req, res, next) => {
  try {
    const med = await medicationService.getById(req.params.id);
    if (!med) {
      return res.status(404).json({
        success: false,
        error: { message: `Medication not found: ${req.params.id}` }
      });
    }
    res.json({
      success: true,
      data: med
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/medications - Add new medication to schedule
router.post('/', async (req, res, next) => {
  try {
    const { medicineName, dosage, scheduledTime, instructions } = req.body;
    if (!medicineName || !dosage || !scheduledTime) {
      return res.status(400).json({
        success: false,
        error: { message: 'Medicine name, dosage, and scheduled time are required.' }
      });
    }

    const created = await medicationService.create({
      medicineName,
      dosage,
      scheduledTime,
      instructions
    });

    res.status(201).json({
      success: true,
      message: 'Medication added to schedule successfully.',
      data: created
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/medications/:id/action - Record Taken, Skipped, or RemindLater
router.post('/:id/action', async (req, res, next) => {
  try {
    const { action, notes, recordedBy } = req.body;
    if (!action) {
      return res.status(400).json({
        success: false,
        error: { message: 'Action (Taken, Skipped, or RemindLater) is required.' }
      });
    }

    const updated = await medicationService.recordAction(req.params.id, {
      action,
      notes: notes || '',
      recordedBy: recordedBy || 'Elder'
    });

    res.json({
      success: true,
      message: `Medication marked as ${action}.`,
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
