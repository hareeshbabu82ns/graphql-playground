const moment = require('moment');
const fs = require('fs');
const _ = require('lodash');

const sequelize = require('../db/sequelize');
const gqlUtils = require('./utils')

const Application = sequelize.model('lending_application')
const Borrower = sequelize.model('borrower')

const attributeMap = {
    id: 'application_id'
};

const Loaders = {
    fetchApplicationCountOfBP: async (borrowerBPId, executionContext) => {
        return await Application.count({ where: { principal_borrower_bp: borrowerBPId } });
    },
    fetchApplicationsOfBP: async (borrowerBPId, executionContext) => {
        const attributes = gqlUtils
            .fetchCurrentSelectionFields(executionContext)
            .map(attribute => _.get(attributeMap, attribute, attribute));
        return await Application.findAll({ attributes, where: { principal_borrower_bp: borrowerBPId }, raw: true });
    }
};

const Schema = fs.readFileSync(__dirname + '/application.graphql', { encoding: 'utf-8' });
const Resolvers = {
    Query: {
        applications: async (__, ___, context, executionContext) => {
            const attributes = gqlUtils
                .fetchCurrentSelectionFields(executionContext)
                .map(attribute => _.get(attributeMap, attribute, attribute));
            const results = await Application.findAll({ attributes, raw: true });
            console.log(results)
            return results;
        },
        application: async (__, { id }, context, executionContext) => {
            const attributes = gqlUtils
                .fetchCurrentSelectionFields(executionContext)
                .map(attribute => _.get(attributeMap, attribute, attribute));
            const result = await Application.findById(id, { attributes });
            return result;
        }
    },
    Mutation: {
        createSimpleApplication: async (_, { input }, { user }) => {
            const objToCreate = Object.assign(input, {
                creation_date: moment().format('YYYY-DD-MM'),
                assigned_to_name: user.userId,
                assigned_to_employee_number: user.userId,
            });
            // create record
            const result = await Application.create(objToCreate)
            return result;
        }
    },
    Application: {
        id: (Application) => Application.application_id,
        borrowers: (parent, args, context, executionContext) => {
            const attributes = gqlUtils
                .fetchCurrentSelectionFields(executionContext)
                .map(attribute => _.get(attributeMap, attribute, attribute));
            return Borrower.findAll({ attributes, where: { application_id: parent.application_id }, raw: true });
        }
    }
}

module.exports = { Schema, Resolvers, Loaders };