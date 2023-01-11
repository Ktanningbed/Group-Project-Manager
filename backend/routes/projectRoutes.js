const express = require('express')
const router = express.Router()
const { getProjects, addProject, deleteProject, updateProject, deleteUser, addUser } = require('../controllers/projectController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getProjects).post(protect, addProject)

router.route('/:id').delete(protect, deleteProject).put(protect, updateProject)

router.route('/user/:id').delete(protect, deleteUser).put(protect, addUser)

module.exports = router