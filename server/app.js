const express = require("express");

// This package automatically parses JSON requests.
const bodyParser = require("body-parser");

// This package will handle GraphQL server requests and responses
// for you, based on your schema.
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");

const schema = require("./schema");

const PORT = process.env.PORT || 3000;

require("dotenv").config({ path: ".env.test" });

const connectMongoDB = require("./db/mongodb-connector");

const start = async () => {
  //connect to DB
  const db = await connectMongoDB();

  //create express server
  const app = express();

  //configure GraphQL server to work with Express
  app.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({ context: { db }, schema }) //pass DB instance to GraphQL context
  );

  //enable GraphiQL for Playground
  app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

  //start listening
  app.listen(PORT, () => {
    console.log(`Hackernews GraphQL server running on port ${PORT}.`);
  });
};

start();
