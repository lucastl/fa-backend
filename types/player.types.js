module.exports = `
    type Player{
        id: ID!
        name: String!
        position: String!
        team: Team
    }

    input PlayerInput{
        name: String!
        position: String!
    }

    extend type Query{
        getPlayers(page: Int, limit: Int = 5): [Player]
        getPlayer(id: ID!): Player 
    }

    extend type Mutation {
        addPlayer(input: PlayerInput, team: ID!): Player
        editPlayer(id: ID!, input: PlayerInput, team: ID!): Player
        deletePlayer(id: ID!, team: ID!): Alert
    }
`