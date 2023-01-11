const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text value']
    },
    priority: {
        type: String,
        required: [true, 'Please indicate a priority']
    },
    project: { 
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Project',
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'User'
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Task', taskSchema)