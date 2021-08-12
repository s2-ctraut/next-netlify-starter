// TODO: https://thecodest.co/blog/deploy-graphql-mongodb-api-using-netlify-functions/

import { Handler } from "@netlify/functions";

const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      return "Hello, world!";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler2: Handler = async (event, _context) => {
  const name = event?.queryStringParameters?.name || "World";

  console.log("Greetings from graphql.ts");
  console.log(event);

  return {
    statusCode: 200,
    body: JSON.stringify({ name }),
  };
};

// const handler: Handler = server.createHandler();
const handler: Handler = async (event, context) => { 
  server.createHandler();
}

export { handler, handler2 };
