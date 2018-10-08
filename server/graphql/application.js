const moment = require('moment');
const fs = require('fs');
const _ = require('lodash');

const waterline = require('../db/waterline');

const Loaders = {
    fetchApplicationCountOfBP: async (borrowerBPId, executionContext) => {
        const LendingApplication = waterline.connection.collections['lending_application'];
        return await LendingApplication.count({ principal_borrower_bp: borrowerBPId });
    },
    fetchApplicationsOfBP: async (borrowerBPId, executionContext) => {
        const LendingApplication = waterline.connection.collections['lending_application'];
        return await LendingApplication.find({ principal_borrower_bp: borrowerBPId });
    }
};

const Schema = fs.readFileSync(__dirname + '/application.graphql', { encoding: 'utf-8' });
const Resolvers = {
    Query: {
        applications: async (__, ___, context, executionContext) => {
            // fetch collection
            const Application = waterline.connection.collections['lending_application'];
            // search record
            const results = await Application.find();
            return results;
        },
        application: async (__, { id }, context, executionContext) => {
            // fetch collection
            const Application = waterline.connection.collections['lending_application'];
            // search record
            const results = await Application.find({ application_id: id });
            return (results) ? results[0] : null;
        }
    },
    Mutation: {
        createSimpleApplication: async (_, { input }, { user }) => {
            // fetch collection
            const Application = waterline.connection.collections['lending_application'];
            const objToCreate = Object.assign(input, {
                creation_date: moment().format('YYYY-DD-MM'),
                assigned_to_name: user.userId,
                assigned_to_employee_number: user.userId,
            });
            // create record
            const results = await Application.create(objToCreate).fetch();
            return results;
        }
    },
    Application: {
        id: (Application) => Application.application_id,
        borrowers: (parent, args, context, executionContext) => {
            const Borrower = waterline.connection.collections['borrower'];
            return Borrower.find({ application_id: parent.application_id });
        }
    }
}

module.exports = { Schema, Resolvers, Loaders };