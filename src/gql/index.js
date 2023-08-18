const { typeDefs } = require("./TypeDefs/schema");
const { resolvers } = require("./resolvers/Resolver");

const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
  subscriptions: {
    path: "/graphql", 
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen({ port:11000 }, () => {
    console.log(`🚀 Server ready at http://localhost11000${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:11000${server.graphqlPath}`);
  });
});
