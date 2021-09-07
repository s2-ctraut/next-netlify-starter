// TODO: https://thecodest.co/blog/deploy-graphql-mongodb-api-using-netlify-functions/

import { HandlerEvent, HandlerContext } from "@netlify/functions";

import { ApolloServer, gql } from "apollo-server-lambda";
import { createMockHandler } from "./lib/server";

const typeDefs = gql`
  type Query {
    hello: String
    sum(summand1: Int, summand2: Int): Int!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "Hello, world!";
    },
    sum: (_: any, args: { summand1: any; summand2: any }) => {
      return args.summand1 + args.summand2;
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
    if (answer.statusCode != 200) {
      console.warn(answer.body);
    }
    return answer;
  });
};

export { handler };
