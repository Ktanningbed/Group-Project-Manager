const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController')

router.route('/:id').post(protect, addTask).delete(protect, deleteTask).put(protect, updateTask).get(protect, getTasks)

module.exports = router