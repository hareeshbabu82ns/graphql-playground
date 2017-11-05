const { makeExecutableSchema } = require("graphql-tools");
const fs = require("fs");
const path = require("path");
const resolvers = require("./resolvers");

// Load the schema file
const typeDefs = fs
  .readFileSync(path.join(__dirname, "hacker_news.graphql"))
  .toString();

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers });
