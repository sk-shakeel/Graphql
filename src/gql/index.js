const { typeDefs } = require("./TypeDefs/schema");
const { resolvers } = require("./resolvers/Resolver");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { ApolloServer } = require("@apollo/server");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
async function runServer() {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 11000,
    },
  });

  console.log(`Server is running at ${url}`);
}

runServer().catch((error) => {
  console.error("Error starting the server:", error);
});
