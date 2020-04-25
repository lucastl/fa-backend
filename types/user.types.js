module.exports = `
    type User {
        id: ID!
        email: String!
        hashedPassword: String
        token: String
        courses: [Course]
    }

    input UserInput {
        email: String!
        password: String
    }

    extend type Query {
        getUsers: [User]
        getUser(id: ID!): User
    }

    extend type Mutation {
        singUp(input: UserInput): User
        logIn(input: UserInput): User
    }
`;