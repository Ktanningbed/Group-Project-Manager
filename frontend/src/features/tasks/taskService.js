import axios from 'axios'

const API_URL = '/api/tasks/'

// Create new task
const createTask = async (taskData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(taskData[0])
    const response = await axios.post(API_URL+taskData[0], taskData[1], config)
    return response.data
}

// Get user projects
const getTasks = async (projectId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL+projectId, config)
    console.log(response.data)
    return response.data
}

// Delete user task
const deleteTask = async (taskId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL+taskId, config)
    return response.data
}

// Update user task
const updateTask = async (taskData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const priority = taskData.priority
    const id = taskData.id
    const url = API_URL+id
    console.log(priority, id, url)
    const response = await axios.put(API_URL+id, {priority}, config)
    return response.data
}

const taskService = {
    createTask, getTasks, deleteTask, updateTask
}

export default taskService