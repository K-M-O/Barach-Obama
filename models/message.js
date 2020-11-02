const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true,
    },
    at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Message', messageSchema)