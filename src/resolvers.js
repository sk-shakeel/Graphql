const { v4: uuid } = require("uuid");
const { Product, products, Category, categories } = require("./data");

exports.resolvers = {
  Query: {
    products: () => products,
    product: (parent, args) => {
      const { id } = args;
      return products.find((product) => product.id === id);
    },

    categories: () => categories,
    category: (parent, args) => {
      const { id } = args;
      return categories.find((category) => category.id === id);
    },
  },
  Category: {
    products: (parent) => {
      return products.filter((product) => product.categoryId === parent.id);
    },
  },
  Mutation: {
    addCategory: (parent, { input }) => {
      const { name } = input;
      const newCategory = {
        id: uuid(),
        name,
      };

      categories.push(newCategory);

      return newCategory;
    },
    deleteProduct: (parent, { input }) => {
      const { id } = input;
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        return true;
      }
      return false;
    },
    updateProduct: (parent, { input }) => {
      const { id, price } = input;
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        products[productIndex].price = price;
        return products[productIndex];
      }
      return undefined;
    },
  },
};

