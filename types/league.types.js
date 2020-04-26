module.exports = `
    type League{
        id: ID!
        name: String!
        slug: String
        teams: [Team]
    }

    input LeagueInput{
        name: String!
        slug: String
    }

    extend type Query{
        getLeagues(page: Int, limit: Int = 5): [League]
        getLeague(id: ID!): League 
    }

    extend type Mutation {
        addLeague(input: LeagueInput): League
        editLeague(id: ID!, input: LeagueInput): League
        deleteLeague(id: ID!): Alert
    }
`