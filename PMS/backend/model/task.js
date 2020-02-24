const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var taskSchema = new mongoose.Schema({
    backlogId: {
        type: mongoose.Schema.Types.String,
        ref: 'backlog.backlogId',
        required: true
    },
    taskId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.String,
        ref: 'user.id',
        required: false
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('task', taskSchema);
