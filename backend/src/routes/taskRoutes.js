const express = require('express');
const { body } = require('express-validator');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validator');

const router = express.Router();

// Validation rules
const taskValidation = [
  body('title').trim().notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description').trim().notEmpty().withMessage('Description is required')
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('status').optional().isIn(['pending', 'completed']).withMessage('Status must be pending or completed')
];

const taskUpdateValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty')
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('status').optional().isIn(['pending', 'completed']).withMessage('Status must be pending or completed')
];

// All routes are protected
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(taskValidation, validate, createTask);

router.route('/:id')
  .get(getTask)
  .put(taskUpdateValidation, validate, updateTask)
  .delete(authorize('admin'), deleteTask);

module.exports = router;
