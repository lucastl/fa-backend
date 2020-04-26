const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    views: Number,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Course', courseSchema);