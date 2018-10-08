const { find } = require('lodash');
const fs = require('fs');
const waterline = require('../db/waterline');
const sequelize = require('../db/sequelize');
const gqlUtils = require('./utils')
const Borrower = sequelize.model('borrower')
const Applicant = sequelize.model('applicant')

const Schema = fs.readFileSync(__dirname + '/borrower.graphql', { encoding: 'utf-8' });
const Resolvers = {
    Query: {
        borrowers: async (_, __, context, executionContext) => {
            // fetch collection
            // const Borrower = waterline.connection.collections['borrower'];
            // search record
            // const results = await Borrower.find();
            const attributes = gqlUtils
                .fetchCurrentSelectionFields(executionContext)
            const results = await Borrower.findAll({ attributes, raw: true });
            return results;
        },
        borrower: async (_, { id }, context, executionContext) => {
            // fetch collection
            // const Borrower = waterline.connection.collections['borrower'];
            // search record
            // const results = await Borrower.find({ borrower_skey: id });
            const attributes = gqlUtils
                .fetchCurrentSelectionFields(executionContext)
            const result = await Borrower.findById(id, { attributes });
            return result;
        }
    },
    Borrower: {
        applicants: ({ borrower_skey }, args, context, executionContext) => {
            // const Applicant = waterline.connection.collections['applicant'];
            const attributes = gqlUtils
                .fetchCurrentSelectionFields(executionContext)
            return Applicant.findAll({ where: { borrower_skey }, attributes, raw: true });
        }
    }
}

module.exports = { Schema, Resolvers };