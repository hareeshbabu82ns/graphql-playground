const { merge, spread } = require('lodash');
const createError = require('http-errors');
const { ApolloServer } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools');
const ApplicationGQL = require('./application');
const BorrowerGQL = require('./borrower');
const ApplicantGQL = require('./applicant');
const PartnerGQL = require('./partner');

function setup(app, middlewares = []) {
    // The GraphQL schema in string form
    const Query = `
        type Query {
            _empty : String
        }
        type Mutation {
            _empty : String
        }
    `;

    // The resolvers
    const resolvers = {};

    // Put together a schema
    const schema = makeExecutableSchema({
        typeDefs: [Query, ApplicationGQL.Schema, PartnerGQL.Schema, BorrowerGQL.Schema, ApplicantGQL.Schema],
        resolvers: merge(resolvers, ApplicationGQL.Resolvers, PartnerGQL.Resolvers, BorrowerGQL.Resolvers, ApplicantGQL.Resolvers),
    });

    // Context will be created per Request and passed to all Nodes of Graph
    const context = async ({ req, res }) => {
        const user = req.sapUserData;
        // const user = await fetchUserData(req);
        if (!user) throw new createError(401, 'not a valid user');
        return {
            user
        };
    };

    // Create ApolloServer
    const server = new ApolloServer({ schema, context });

    // attach ApolloServer to Express App
    server.applyMiddleware({ app });
};

module.exports = setup;