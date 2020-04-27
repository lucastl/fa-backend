const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    local: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    goals_local: Number,
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    goals_visitor: Number,
    date: Date,
    match_day: Date,
    status: String,
    episode: Number
});

module.exports = mongoose.model('Match', matchSchema);