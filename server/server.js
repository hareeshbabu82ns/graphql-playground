const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { json } = require('body-parser');

const PORT = process.env.NODE_PORT || 3001;

app.use(cors());
app.use(morgan(`API Request (port ${PORT}): :method :url :status :response-time ms - :res[content-length]`));
app.use(json());

app.use(require('./middlewares/sso-token-validator-middleware'));

//initiate GraphQL
require('./graphql')(app);

app.listen(PORT);
console.log(`Server listening on http://localhost:${PORT}.`);