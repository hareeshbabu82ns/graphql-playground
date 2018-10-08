module.exports = {
    adapters: {
        postgresql: require('sails-postgresql'),
        mongo: require('sails-mongo')
    },
    datastores: {
        default: {
            adapter: 'postgresql',
            url: 'postgresql://simple_lending_user:UECPKNPXE4GISQHD@sl-us-south-1-portal.31.dblayer.com:54766/atb_lending',
            schemaName: 'simple_business_lending',
        },
        mongo: {
            adapter: 'mongo',
            url: 'mongodb://lendingOperator:KEU822FEJ23D9E24@sl-us-south-1-portal.15.dblayer.com:29111/lending',
            ssl: true,
        }
    }
};