// TODO: https://thecodest.co/blog/deploy-graphql-mongodb-api-using-netlify-functions/

import { HandlerEvent, HandlerContext } from "@netlify/functions";

import { ApolloServer, gql } from "apollo-server-lambda";
import { createMockHandler } from "./server";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "Hello, world!";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = async (event: HandlerEvent, context: HandlerContext) => {
  const s = createMockHandler(server.createHandler());
  return s(event, context).then((answer) => {
    // console.log(answer.body);
    return answer;
  });
};

export { handler };
