const League = require('../models/league');
const Team = require('../models/team');
const Player = require('../models/player');
module.exports = {
    Query: {
        async getTeams(obj, { page, limit }, context) {
            // console.log(context);
            let teams = Team.find();
            if (page !== undefined) {
                teams = teams.limit(limit).skip((page - 1) * limit);
            }
            return await teams;
        },
        async getTeam(obj, { id }) {
            const team = await Team.findById(id);
            return team;
        }
    },
    Mutation: {
        async addTeam(obj, { input, league }) {
            const leagueObj = await League.findById(league);
            const team = new Team({ ...input, league: league });
            await team.save();
            leagueObj.teams.push(team);
            await leagueObj.save();
            return team;
        },
        async editTeam(obj, { id, input, league }) {
            const team = await Team.findByIdAndUpdate(id, { ...input, league: league });
            return team;
        },
        async deleteTeam(obj, { id, league }) {
            const leagueObj = await League.findById(league);
            const deletedTeam = leagueObj.teams.filter( team => team._id.toString() !== id);
            leagueObj.teams = deletedTeam;
            await leagueObj.save();
            await Team.deleteOne({ _id: id })
            return {
                message: `El equipo con id: ${id} se ha borrado.`
            }
        }
    },
    Team: {
        async players(t) {
            return await Player.find({ team: t.id });
        },
        async league(t) {
            return await League.findById(t.league);
        },
    }
}