const League = require('../models/league');
const Team = require('../models/team');
const Player = require('../models/player');
const Match = require('../models/match');

const calcStatsMatches = require('../libs/calcStatsMatches');

module.exports = {
    Query: {
        async getMatches(obj, { page, limit, league }, context) {
            // console.log(context);
            let matches = await Match.find();
            // if (page !== undefined) {
            //     matches = matches.limit(limit).skip((page - 1) * limit);
            // }
            if (league !== undefined) {
                let matchesOfLeague = [];
                for (const key in matches) {
                    let localObj = await Team.findById(matches[key].local);
                    if (localObj.league == league) {
                        matchesOfLeague.push(matches[key]);
                    }
                }
                matches = matchesOfLeague;
            }
            return await matches;
        },
        async getMatch(obj, { id }) {
            const match = await Match.findById(id);
            return match;
        }
    },
    Mutation: {
        async addMatch(obj, { input }) {
            // console.log(input);
            const localObj = await Team.findById(input.local);
            const visitorObj = await Team.findById(input.visitor);
            const match = new Match({ ...input });
            match.date = new Date();

            for (const key in localObj.statistics) {
                if (localObj.statistics[key] == null) {
                    localObj.statistics[key] = 0;
                }
                if (visitorObj.statistics[key] == null) {
                    visitorObj.statistics[key] = 0;
                }
            }

            //Local
            localObj.statistics.gp = localObj.statistics.gp + 1; // Jugados
            localObj.statistics.gs = localObj.statistics.gs + input.goals_local; // Goles a favor
            localObj.statistics.gr = localObj.statistics.gr + input.goals_visitor; // Goles recibidos
            localObj.statistics.dif = localObj.statistics.gs - localObj.statistics.gr; // Dif de goles

            //Visitor
            visitorObj.statistics.gp = visitorObj.statistics.gp + 1; // Jugados
            visitorObj.statistics.gs = visitorObj.statistics.gs + input.goals_visitor; // Goles a favor
            visitorObj.statistics.gr = visitorObj.statistics.gr + input.goals_local; // Goles recibidos
            visitorObj.statistics.dif = visitorObj.statistics.gs - visitorObj.statistics.gr; // Dif de goles

            // Si gana local
            if (input.goals_local > input.goals_visitor) {

                // Local
                localObj.statistics.wm = localObj.statistics.wm + 1; // Ganados
                localObj.statistics.pts = localObj.statistics.pts + 3; // Puntos
                // Visitor
                visitorObj.statistics.lm = visitorObj.statistics.lm + 1; // Perdidos

            }
            // Si gana visitor
            if (input.goals_visitor > input.goals_local) {
                // Visitor
                visitorObj.statistics.wm = visitorObj.statistics.wm + 1; // Ganados
                visitorObj.statistics.pts = visitorObj.statistics.pts + 3; // Puntos
                // Local
                localObj.statistics.lm = localObj.statistics.lm + 1; // Perdidos
            }
            // Si empatan
            if (input.goals_visitor === input.goals_local) {
                // Visitor
                visitorObj.statistics.tm = visitorObj.statistics.tm + 1; // Empatados
                // Local
                localObj.statistics.tm = localObj.statistics.tm + 1; // Empatados
            }

            await localObj.save();
            await visitorObj.save();
            await match.save();
            return match;
        },
        async editMatch(obj, { id, input }) {
            let localObj = await Team.findById(input.local);
            let visitorObj = await Team.findById(input.visitor);
            const match = await Match.findByIdAndUpdate(id, { ...input });
            const matches = await Match.find();

            calcStatsMatches(localObj, visitorObj, matches);

            await localObj.save();
            await visitorObj.save();
            return match;
        },
        async deleteMatch(obj, { id }) {
            const match = await Match.findById(id);
            const localObj = await Team.findById(match.local);
            const visitorObj = await Team.findById(match.visitor);
            await Match.deleteOne({ _id: id })
            const matches = await Match.find();

            calcStatsMatches(localObj, visitorObj, matches);

            await localObj.save();
            await visitorObj.save();
            return {
                message: `El partido con id: ${id} se ha borrado.`
            }
        }
    },
    Match: {
        async local(m) {
            return await Team.findById(m.local);
        },
        async visitor(m) {
            return await Team.findById(m.visitor);
        },
    }
}

