import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import projectService from './projectService'

const initialState = {
    projects: [],
    emails: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// create new project
export const createProject = createAsyncThunk('project/create', async (projectData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token // thunkAPI lets us get the token wherever it is
        return await projectService.createProject(projectData, token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message) //error payload
    }
})

// Get user projects
export const getProjects = createAsyncThunk('project/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token // thunkAPI lets us get the token wherever it is
        return await projectService.getProjects(token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message) //error payload
    }
})

// Delete user project
export const deleteProject = createAsyncThunk('project/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token // thunkAPI lets us get the token wherever it is
        return await projectService.deleteProject(id, token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message) //error payload
    }
})

// Update user project
export const updateProject = createAsyncThunk('project/update', async (projectData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await projectService.updateProject(projectData, token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message) //error payload
    }
})

// add user to project
export const addUser = createAsyncThunk('project/add', async (idandemail, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await projectService.addUser(idandemail, token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message) //error payload
    }
})

// delete user from project
export const deleteUser = createAsyncThunk('project/delete', async (idandemail, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await projectService.deleteUser(idandemail, token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message) //error payload
    }
})

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProject.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects.push(action.payload) // add onto the projects
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getProjects.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = action.payload 
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteProject.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = state.projects.filter((project) => project._id !== action.payload.id) // filter out the deleted goal
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateProject.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = state.projects.map((project) => {
                    if(project._id===action.payload._id){
                        return action.payload
                    }
                    return project
                })
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(addUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.projects = state.projects.map((project) => {
                    if(project._id===action.payload._id){
                        return action.payload
                    }
                    return project
                })
            })
            .addCase(addUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            // .addCase(deleteUser.pending, (state) => {
            //     state.isLoading = true
            // })
            // .addCase(deleteUser.fulfilled, (state, action) => {
            //     state.isLoading = false
            //     state.isSuccess = true
            //     state.projects = state.projects.map((project) => {
            //         if(project._id===action.payload._id){
            //             return action.payload
            //         }
            //         return project
            //     })
            // })
            // .addCase(deleteUser.rejected, (state, action) => {
            //     state.isLoading = false
            //     state.isError = true
            //     state.message = action.payload
            // })
    }
})

export const {reset} = projectSlice.actions
export default projectSlice.reducer