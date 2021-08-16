// https://www.apollographql.com/docs/apollo-server/v2/deployment/netlify/

// src/lambda/graphql.js
import {
  ApolloServer as ApolloServerLambda,
  gql,
  CreateHandlerOptions,
} from "apollo-server-lambda";
import { ApolloServer, gql } from "apollo-server-express";

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

const lambdaServer = new ApolloServerLambda({
  typeDefs,
  resolvers,
});
/* .applyMiddleware({
  app,
  cors: { origin: "http://localhost:3000", credentials: true },
});
*/

const plainServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// exports.handler = server().createHandler();
// exports.handler = server;

import { Handler } from "@netlify/functions";

let counter = 0;

const handler2: Handler = async (event, _context) => {
  console.log(event);

  return server.createHandler();
  /*
  const arg1 = Number(event?.queryStringParameters?.arg1) || 0;
  const arg2 = Number(event?.queryStringParameters?.arg2) || 0;
  const sum = arg1 + arg2;

  console.log("Greetings from add.ts");
  console.log(`Count = ${counter}`);
  counter++;

  return {
    statusCode: 200,
    body: JSON.stringify({ sum, counter }),
  };
  */
};

const lambdaHandler: Handler = lambdaServer.createHandler();
const handler: Handler = plainServer.createHandler();

export { handler };
