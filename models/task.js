const mongoose = require('mongoose')

// task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'must provide the name'],
        trim: true,
        maxlength: [30, 'title can not be more than 30 characters']
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['in progress', 'completed', 'pending'], default: 'pending'
    },
    assignedUser: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
});


// user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

const Task = mongoose.model('Task',taskSchema)
const User = mongoose.model('User',userSchema)

module.exports = {
    Task,
    User
}