const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
// const { makeExecutableSchema } = require('graphql-tools');

const { ApolloServer } = require('apollo-server-express');

const { merge } = require('lodash');

const courseTypeDefs = require('./types/course.types');
const courseResolvers = require('./resolvers/course.resolvers');

const userTypeDefs = require('./types/user.types');
const userResolvers = require('./resolvers/user.resolvers');

const leagueTypeDefs = require('./types/league.types');
const leagueResolvers = require('./resolvers/league.resolvers');

const teamTypeDefs = require('./types/team.types');
const teamResolvers = require('./resolvers/team.resolvers');

const playerTypeDefs = require('./types/player.types');
const playerResolvers = require('./resolvers/player.resolvers');

const matchTypeDefs = require('./types/match.types');
const matchResolvers = require('./resolvers/match.resolvers');

const authFunc = require('./libs/auth');

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/graphql_db', { useNewUrlParser: true });

const app = express();

const typeDefs = `
    type Alert{
        message: String
    }

    type Query{
        _: Boolean
    }

    type Mutation{
        _: Boolean
    }
`;

const resolver = {};

// const schema = makeExecutableSchema({
//     typeDefs: [typeDefs, courseTypeDefs, userTypeDefs],
//     resolvers: merge(resolver, courseResolvers, userResolvers),
// });

// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const server = new ApolloServer({
    typeDefs: [typeDefs, courseTypeDefs, userTypeDefs, leagueTypeDefs, teamTypeDefs, playerTypeDefs, matchTypeDefs],
    resolvers: merge(resolver, courseResolvers, userResolvers, leagueResolvers, teamResolvers, playerResolvers, matchResolvers),
    context: authFunc
});

server.applyMiddleware({ app: app });


app.listen(8080, () => {
    console.log('siendo');
});