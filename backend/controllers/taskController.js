const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModel')
const User = require('../models/userModel')
const Task = require('../models/taskModel')


// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ project: req.params.id })
    if(tasks.length==0){
        res.status(200).json([])
    }
    // console.log(tasks)
    const users = tasks[0].users
    // console.log(`users: ${users}`)
    if(!users.includes(req.user.id)){
        res.status(400)
        throw new Error('User not authorized')
    }
    res.status(200).json(tasks)
})

// @desc    Add task
// @route   POST /api/tasks/:id
// @access  Private
const addTask = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)
    const users = project.users
    
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    if(!req.body.priority){
        res.status(400)
        throw new Error('Please add a priority')
    }
    if(!users.includes(req.user.id)){
        res.status(400)
        throw new Error('User not authorized')
    }
    const newTask = await Task.create({
        text: req.body.text,
        priority: req.body.priority,
        project: project,
        users: users
    })

    res.status(201).json(newTask)

})

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)

    if(!task){
        res.status(400)
        throw new Error('Task not found')
    }
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    if(!task.users.includes(req.user.id)){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedTask)
})

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)

    if(!task){
        res.status(400)
        throw new Error('Task not found')
    }
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    if(!task.users.includes(req.user.id)){
        res.status(401)
        throw new Error('User not authorized')
    }

    await task.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTasks, addTask, updateTask, deleteTask
}