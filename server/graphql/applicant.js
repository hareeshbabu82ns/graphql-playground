const { find } = require('lodash');
const fs = require('fs');

const waterline = require('../db/waterline');

const Schema = fs.readFileSync(__dirname + '/applicant.graphql', { encoding: 'utf-8' });
const Resolvers = {
    Query: {
        applicants: async (_, __, context, executionContext) => {
            // fetch collection
            const Applicant = waterline.connection.collections['applicant'];

            // search record
            const results = await Applicant.find();
            return results;
        },
        applicant: async (_, { id }, context, executionContext) => {
            // fetch collection
            const Applicant = waterline.connection.collections['applicant'];
            // search record
            const results = await Applicant.find({ applicant_skey: id });
            return (results) ? results[0] : null;
        }
    },
    Applicant: {
    }
}

module.exports = { Schema, Resolvers };