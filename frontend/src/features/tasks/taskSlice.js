import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import taskService from './taskService'

const initialState = {
    tasks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// create new Task
export const createTask = createAsyncThunk('task/create', async (TaskData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token // thunkAPI lets us get the token wherever it is
        return await taskService.createTask(TaskData, token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message) //error payload
    }
})

// Get user Tasks
export const getTasks = createAsyncThunk('task/getAll', async (projectId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token // thunkAPI lets us get the token wherever it is
        return await taskService.getTasks(projectId, token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message) //error payload
    }
})

// Delete Task
export const deleteTask = createAsyncThunk('task/delete', async (taskId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token // thunkAPI lets us get the token wherever it is
        return await taskService.deleteTask(taskId, token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message) //error payload
    }
})

// Update Task
export const updateTask = createAsyncThunk('task/update', async(taskData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await taskService.updateTask(taskData, token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message) //error payload
    }
})

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks.push(action.payload) // add onto the goals
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = action.payload 
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = state.tasks.filter((task) => task._id !== action.payload.id) // filter out the deleted goal
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = state.tasks.map((task) => {
                    if(task._id===action.payload._id){
                        return action.payload
                    }
                    return task
                })
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = taskSlice.actions
export default taskSlice.reducer