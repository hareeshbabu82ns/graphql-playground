const axiosCRM = require('../db/axiosCRM');
const fs = require('fs');
const { Loaders } = require('./application');


const Schema = fs.readFileSync(__dirname + '/partner.graphql', { encoding: 'utf-8' });
const typeMap = { "PERSON": 1, "ORGANIZATION": 2, "GROUP": 3 };
const Resolvers = {
    Query: {
        partners: (_, { query }, context) => {
            const params = {
                partnerId: query.partnerId,
                name: query.name,
                type: typeMap[query.type]
            };
            return axiosCRM.get('/bp', { params })
                .then(({ data }) => data);
        },
        partner: (_, { id }) => axiosCRM.get(`/bp/${id}`).then(({ data }) => data)
    },
    PartnerSearchResult: {
        id: (Partner) => Partner.partnerId,
        classification: (parent, args, context) =>
            axiosCRM.get(`/bp/${parent.partnerId}/classification`)
                .then(({ data }) => data),
        applicationCount: (parent, __, ___, executionContext) => Loaders.fetchApplicationCountOfBP(parent.partnerId, executionContext),
        applications: (parent, __, ___, executionContext) => Loaders.fetchApplicationsOfBP(parent.partnerId, executionContext)
    },
    Partner: {
        id: (Partner) => Partner.partner,
        applicationCount: (parent, __, ___, executionContext) => Loaders.fetchApplicationCountOfBP(parent.partner, executionContext),
        applications: (parent, __, ___, executionContext) => Loaders.fetchApplicationsOfBP(parent.partner, executionContext)
    },
    Classification: {
        id: (obj) => obj.classific
    }
}

module.exports = { Schema, Resolvers };