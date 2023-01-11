const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'User'
    },
    emails:{
        type: [String],
        required: true,
        unique: false,
    },
    text: {
        type: String,
        required: [true, 'Please add a text value'],
        unique: true
    },
    
},
{
    timestamps: true,
})

module.exports = mongoose.model('Project', projectSchema)