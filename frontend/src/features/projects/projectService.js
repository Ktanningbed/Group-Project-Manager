import axios from 'axios'

const API_URL = '/api/projects/'

// Create new project
const createProject = async (projectData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, projectData, config)
    return response.data
}

// Get user projects
const getProjects = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data
}

// Delete user project
const deleteProject = async (projectId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL+projectId, config)
    return response.data
}

// Update user project
const updateProject = async (projectData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.put(API_URL+projectData[1].id, projectData[0], config)
    return response.data
}

// add user to project
const addUser = async (idandemail, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(idandemail[0])
    console.log(idandemail[1])
    const response = await axios.put(API_URL+'user/'+idandemail[0], idandemail[1], config)
    return response.data
}

const deleteUser = async (idandemail, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL+'user/'+idandemail[0], idandemail[1], config)
    return response.data
}

const projectService = {
    createProject, getProjects, deleteProject, updateProject, addUser, deleteUser
}

export default projectService