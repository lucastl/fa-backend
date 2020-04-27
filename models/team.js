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
    statistics: {
        gp: Number, // Jugados
        tm: Number, // Empatados
        lm: Number, // Perdidos
        wm: Number, // Ganados
        gs: Number, // Goles a favor
        gr: Number, // Goles recibidos
        dif: Number, // Diferencia de goles
        pts: Number, // Puntos
    }
});

module.exports = mongoose.model('Team', teamSchema);