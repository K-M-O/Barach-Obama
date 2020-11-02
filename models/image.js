const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    image: {
        type: Buffer,
        required: true
    },
    imageType: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    main: {
        type: Boolean,
        required: true
    }
})

// create base64 stored images.

imageSchema.virtual('imagePath').get(function() {
    if (this.image != null && this.imageType != null) {
        return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
    }
})

module.exports = mongoose.model('Image', imageSchema)