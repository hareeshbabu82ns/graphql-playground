const waterline = require('./index');

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { json } = require('body-parser');

const mapMongoToPgSQL = require('./mongo_to_pgsql_mapper_util');

const PORT = process.env.NODE_PORT || 3002;

app.use(cors());
app.use(morgan(`API Request (port ${PORT}): :method :url :status :response-time ms - :res[content-length]`));
app.use(json());

app.listen(PORT);

app.get('/', async (req, res) => {
    // PgSQL connection
    const LendingApplication = waterline.connection.collections['lending_application'];
    // const applications = await LendingApplication.find().meta({ schemaName: 'simple_business_lending' });
    const applications = await LendingApplication.find();


    // Mongo connection
    const LendingApplicationMongo = waterline.connection.collections['simple_applications'];

    // const applicationsMongo = await LendingApplicationMongo.find({
    //     // applicationId: 'SL2470',
    //     'applicationStatus.applicationStatusCode': 'approvedreadyforfulfillment',
    // });

    const mongoDB = waterline.connection.datastores.mongo.adapter.datastores.mongo.manager;
    const collection = mongoDB.collection('simpleApplications');
    const applicationsMongo = await collection.find({
        // applicationID: { '$gt': 'SL2050' },
        // applicationAssignedTo: 'C41011',
        'applicationStatus.applicationStatusCode': 'approvedreadyforfulfillment'
    }).toArray();

    // const applicationsMongo = await LendingApplicationMongo.find({ applicationID: { '$gt': 'SL2050' }, applicationAssignedTo: 'C41011', 'applicationStatus.applicationStatusCode': 'approvedreadyforfulfillment' });

    applicationsMongo.forEach(async (mongoEntiry) => {
        await mapMongoToPgSQL(waterline, mongoEntiry);
    });


    res.send({ applications, applicationsMongo });
});

console.log(`Server listening on http://localhost:${PORT}.`);
