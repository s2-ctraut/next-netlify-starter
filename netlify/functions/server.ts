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
    */
  });

function createLocalServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    // playground: true,
  });
}

export { createLambdaServer, createLocalServer };
