const { find } = require('lodash');
const fs = require('fs');

// const waterline = require('../db/waterline');
const sequelize = require('../db/sequelize');
const gqlUtils = require('./utils')

const Applicant = sequelize.model('applicant')

const Schema = fs.readFileSync(__dirname + '/applicant.graphql', { encoding: 'utf-8' });
const Resolvers = {
    Query: {
        applicants: async (_, __, context, executionContext) => {
            // fetch collection
            // const Applicant = waterline.connection.collections['applicant'];

            // search record
            // const results = await Applicant.find();
            const attributes = gqlUtils
                .fetchCurrentSelectionFields(executionContext)
            const results = await Applicant.findAll({ attributes, raw: true });
            return results;
        },
        applicant: async (_, { id }, context, executionContext) => {
            // fetch collection
            // const Applicant = waterline.connection.collections['applicant'];
            // search record
            // const results = await Applicant.find({ applicant_skey: id });
            // return (results) ? results[0] : null;
            const attributes = gqlUtils
                .fetchCurrentSelectionFields(executionContext)
            const result = await Applicant.findById(id, { attributes });
            return result;
        }
    },
    Applicant: {
    }
}

module.exports = { Schema, Resolvers };