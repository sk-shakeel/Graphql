const { gql } = require("graphql-tag");

exports.typeDefs = gql`
  type Weather {
    id: ID!
    city: String!
    temperature: Float!
    description: String!
  }

  type Query {
    weather: [Weather]
  }
`;
