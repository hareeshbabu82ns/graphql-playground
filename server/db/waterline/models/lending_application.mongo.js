module.exports = {
    tableName: 'simpleApplications',
    identity: 'simple_applications',
    datastore: 'mongo',
    primaryKey: 'applicationID',
    schema: false,

    attributes: {
        applicationID: { type: 'string', required: true, columnName: 'applicationID' },
    }
}