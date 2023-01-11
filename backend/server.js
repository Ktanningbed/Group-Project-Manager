const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const colors = require('colors')
const connectDB = require('./config/db')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/projects', require('./routes/projectRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tasks', require('./routes/taskRoutes'))

app.listen(port, () => console.log(`Server Started on port ${port}`))