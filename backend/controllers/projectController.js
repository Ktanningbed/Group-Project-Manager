const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModel')
const User = require('../models/userModel')
const Task = require('../models/taskModel')

// @desc    Get projects
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({ users: req.user.id })
    res.status(200).json(projects)
})

// @desc    Add projects
// @route   POST /api/projects
// @access  Private
const addProject = asyncHandler(async (req, res) => {
    const user = await User.findOne({_id: req.user.id})
    const email = user.email
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const emails = [email]
    const users = [req.user.id]
    
    const project = await Project.create({
        users,
        emails,
        text: req.body.text,
    })
    res.status(201).json(project)
})

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    if(!project){
        res.status(400)
        throw new Error('Project not found')
    }

    // check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // make sure logged in user matches 
    if(!project.users.includes(req.user.id)){
        res.status(401)
        throw new Error('User not authorized')
    }
    await project.remove()

    const tasks = await Task.find({project: req.params.id})
    tasks.forEach((task) => task.remove())
    res.status(200).json({ id: req.params.id })

})

// @desc    Delete user from project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    if(!project){
        res.status(400)
        throw new Error('Project not found')
    }

    // check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // make sure logged in user matches 
    if(!project.users.includes(req.user.id)){
        res.status(401)
        throw new Error('User not authorized')
    }

    if(!req.body.email){
        res.status(400)
        throw new Error('User not found')
    }
    const deleteUser = await User.findOne({email: req.body.email})
    if(!deleteUser){
        res.status(400)
        throw new Error('User does not exist in this project')
    }

    const deletedUserProject = await Project.updateOne({_id: req.params.id}, 
        { $set: {users: project.users.filter((user) => JSON.stringify(user)!==JSON.stringify(deleteUser._id))}})
    const updatedUserTasks = await Task.updateMany({project: req.params.id}, { $set: {users: project.users.filter((user) => JSON.stringify(user)!==JSON.stringify(deleteUser._id))}}, {new: true})
    const deletedEmailProject = await Project.updateOne({_id: req.params.id}, 
        { $set: {emails: project.emails.filter((email) => JSON.stringify(email)!==JSON.stringify(req.body.email))}})

    res.status(200).json(await Project.findById(req.params.id))
})

// @desc    Add user to project
// @route   PUT /api/projects/:id
// @access  Private
const addUser = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    if(!project){
        res.status(400)
        throw new Error('Project not found')
    }

    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    if(!project.users.includes(req.user.id)){
        res.status(401)
        throw new Error('User not authorized')
    }

    if(!req.body.email){
        res.status(400)
        throw new Error('User not found')
    }
    const newUser = await User.findOne({email: req.body.email})
    if(!newUser){
        res.status(400)
        throw new Error('User does not exist')
    }
    const curProject = await Project.findById(req.params.id)
    if(curProject.users.includes(newUser._id)){
        res.status(400)
        throw new Error('User already exists in this project')
    }
    const newUsers = [newUser._id, ...project.users]
    const newEmails = [req.body.email, ...project.emails]
    console.log(newUsers)
    console.log(newEmails)
    const updatedProject = await Project.updateOne({_id: req.params.id}, { $set: {users: newUsers }}, {new: true})
    const updatedTasks = await Task.updateMany({project: req.params.id}, { $set: {users: newUsers}}, {new: true})
    const updateEmail = await Project.updateOne({_id: req.params.id}, { $set: {emails: newEmails }}, {new: true})
    res.status(200).json(await Project.findById(req.params.id))
})

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    if(!project){
        res.status(400)
        throw new Error('Project not found')
    }

    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    if(!project.users.includes(req.user.id)){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true})
    console.log(req.body.users)
    res.status(200).json(updatedProject)

})


module.exports = {
    getProjects, addProject, updateProject, deleteProject, addUser, deleteUser
}