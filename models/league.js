const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    name: String,
    slug: String,
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }]
});

module.exports = mongoose.model('League', leagueSchema);