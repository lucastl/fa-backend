module.exports = `

    scalar Date

    type Match{
        id: ID!
        local: Team
        goals_local: Int
        visitor: Team
        goals_visitor: Int
        date: Date
        match_day: Date
        status: String
        episode: Int
    }

    input MatchInput{
        local: ID!
        visitor: ID!
        goals_local: Int
        goals_visitor: Int
        match_day: Date
        status: String
        episode: Int
    }

    extend type Query{
        getMatches(page: Int, limit: Int = 5, league: ID): [Match]
        getMatch(id: ID!): Match 
    }

    extend type Mutation {
        addMatch(input: MatchInput): Match
        editMatch(id: ID!, input: MatchInput): Match
        deleteMatch(id: ID!): Alert
    }
`