const League = require('../models/league');
const Team = require('../models/team');
module.exports = {
    Query: {
        async getLeagues(obj, { page, limit }, context) {
            // console.log(context);
            let leagues = League.find();
            if ( page !== undefined ) {
                leagues = leagues.limit(limit).skip((page - 1) * limit);
            }
            return await leagues;
        },
        async getLeague(obj, { id }) {
            const league = await League.findById(id);
            return league;
        }
    },
    Mutation: {
        async addLeague(obj, { input }) {
            const league = new League({...input} );
            await league.save();
            return league;
        },
        async editLeague(obj, { id, input }) {
            const league = await League.findByIdAndUpdate(id, input);
            return league;
        },
        async deleteLeague(obj, { id }) {
            await League.deleteOne({ _id: id })
            return {
                message: `La liga con id: ${id} se ha borrado.`
            }
        }
    },
    League: {
        async teams(l) {
            return await Team.find({ league: l.id});
        }
    }
}