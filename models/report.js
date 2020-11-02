const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    reportedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    reportedBy: {
        type: String,
        required: true
    },
    reportType: {
        //reports type : authReport, orderReport, productReport, adminReport.
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Report', reportSchema)