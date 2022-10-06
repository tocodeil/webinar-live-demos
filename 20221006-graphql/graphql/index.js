const { makeExecutableSchema } = require('@graphql-tools/schema');
const resolvers = require('./resolver');
const typeDefs = require('./schema.graphql');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});

