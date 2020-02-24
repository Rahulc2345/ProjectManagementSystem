const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var chatSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    // userId:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'user'
    // }],
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        default: Date.now
    },
    groupId: {
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'project.id'
    }
});

module.exports = mongoose.model('chat', chatSchema);