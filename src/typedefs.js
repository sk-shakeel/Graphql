const { gql } = require("graphql-tag");


exports.typeDefs = gql`
  type Product {
    id: String
    name: String
    price: String
    rating: Float
  }

  type Category {
    id: String
    name: String
    products: [Product]
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
    categories: [Category]
    category(id: ID!): Category
  }

  type Mutation {
    addCategory(input: AddCategoryInput): Category!
    deleteProduct(input: DeleteProductInput): Boolean!
    updateProduct(input: UpdateProductInput): Product!
  }

  input AddCategoryInput {
    name: String
  }

  input DeleteProductInput {
    id: String
  }

  input UpdateProductInput {
    id: String
    price: String
  }
`;

