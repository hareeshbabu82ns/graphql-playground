const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./graphql_schema');

const app = new express();

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('app listening on 4000');
});