const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: String,
    slug: String,
    championships: Number,
    logo: String,
    league: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League'
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    location: String,
});

module.exports = mongoose.model('Team', teamSchema);