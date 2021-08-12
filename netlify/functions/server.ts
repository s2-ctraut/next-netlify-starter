import ApolloServer from "apollo-server";
import ApolloServerLambda, { gql } from "apollo-server-lambda";

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

function createLambdaServer() {
  return new ApolloServerLambda.ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    // playground: true,
  });
}

function createLocalServer() {
  return new ApolloServer.ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    // playground: true,
  });
}

export { createLambdaServer, createLocalServer };
