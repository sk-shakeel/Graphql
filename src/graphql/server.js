// server.js

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./schema"); // Update the path as needed
const { resolvers } = require("./resolvers"); // Update the path as needed

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function runServer() {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 9000,
    },
  });

  console.log(`Server is running at ${url}`);
}

runServer().catch((error) => {
  console.error("Error starting the server:", error);
});
