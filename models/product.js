const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    },
    report:{
        type: String,
    },
    location:{
    }
})

module.exports = mongoose.model('Product', productSchema)