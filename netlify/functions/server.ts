import { ApolloServer } from "apollo-server";
import { gql } from "apollo-server-lambda";
import { ApolloServer as ApolloServerLambda } from "apollo-server-lambda";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hi! Love from @stemmlerjs 🤠.",
  },
};

/*
function createLambdaServer() {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    // playground: true,
  });
}
*/

/*
const createLambdaServer = async () =>
  new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    // playground: true,
    /*
    context: async () => {
      await connectToDatabase();

      return {
        models: {
          userModel,
        },
      };
    },
  });
  */

import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventHeaders,
  Context,
} from "aws-lambda";
const createLambdaServer = async (
  { headers }: APIGatewayProxyEvent,
  context: Context
) => {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    context: async () => {
      // await connectToDatabase();

      // const auth = await checkAuth(headers);

      return {
        // auth,
        models: {
          // userModel,
        },
      };
    },
  });
};

const createLocalServer = () => {
  console.log("*************** createLocalServer");
  new ApolloServer({
    typeDefs,
    resolvers,
  });
};

export { createLambdaServer, createLocalServer };
