const Team = require('../models/team');
const Player = require('../models/player');
module.exports = {
    Query: {
        async getPlayers(obj, { page, limit }, context) {
            // console.log(context);
            let players = Player.find();
            if (page !== undefined) {
                players = players.limit(limit).skip((page - 1) * limit);
            }
            return await players;
        },
        async getPlayer(obj, { id }) {
            const player = await Player.findById(id);
            return player;
        }
    },
    Mutation: {
        async addPlayer(obj, { input, team }) {
            const teamObj = await Team.findById(team);
            const player = new Player({ ...input, team });
            await player.save();
            teamObj.players.push(player);
            await teamObj.save();
            return player;
        },
        async editPlayer(obj, { id, input, team }) {
            const player = await Player.findByIdAndUpdate(id, { ...input, team: team });
            return player;
        },
        async deletePlayer(obj, { id }) {
            await Player.deleteOne({ _id: id })
            return {
                message: `El jugador con id: ${id} se ha borrado.`
            }
        }
    },
    Player: {
        async team(p) {
            return await Team.findById(p.team);
        },
    }
}