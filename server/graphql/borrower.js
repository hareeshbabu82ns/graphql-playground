const { find } = require('lodash');
const fs = require('fs');
const waterline = require('../db/waterline');

const Schema = fs.readFileSync(__dirname + '/borrower.graphql', { encoding: 'utf-8' });
const Resolvers = {
    Query: {
        borrowers: async (_, __, context, executionContext) => {
            // fetch collection
            const Borrower = waterline.connection.collections['borrower'];
            // search record
            const results = await Borrower.find();
            return results;
        },
        borrower: async (_, { id }, context, executionContext) => {
            // fetch collection
            const Borrower = waterline.connection.collections['borrower'];
            // search record
            const results = await Borrower.find({ borrower_skey: id });
            return results;
        }
    },
    Borrower: {
        applicants: ({ borrower_skey }, args, context, executionContext) => {
            const Applicant = waterline.connection.collections['applicant'];
            return Applicant.find({ borrower_skey });
        }
    }
}

module.exports = { Schema, Resolvers };