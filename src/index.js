const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./typedefs");
const { resolvers } = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function runServer() {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 6000,
    },
  });

  console.log(`Server is running at ${url}`);
}

runServer().catch((error) => {
  console.error("Error starting the server:", error);
});
