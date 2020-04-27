module.exports = `
    type Team{
        id: ID!
        name: String!
        slug: String!
        championships: Int
        logo: String
        league: League
        players: [Player]
        location: String
        statistics: Statistics
    }

    type Statistics{
        gp: Int
        tm: Int
        lm: Int
        wm: Int
        gs: Int
        gr: Int
        dif: Int
        pts: Int
    }

    input TeamInput{
        name: String!
        slug: String!
        championships: Int
        logo: String
        location: String
    }

    extend type Query{
        getTeams(page: Int, limit: Int = 5): [Team]
        getTeam(id: ID!): Team 
    }

    extend type Mutation {
        addTeam(input: TeamInput, league: ID!): Team
        editTeam(id: ID!, input: TeamInput, league: ID!): Team
        deleteTeam(id: ID!, league: ID!): Alert
    }
`