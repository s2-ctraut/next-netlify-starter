// TODO: https://thecodest.co/blog/deploy-graphql-mongodb-api-using-netlify-functions/

import { HandlerEvent, HandlerContext } from "@netlify/functions";
import mongoose, { Connection } from "mongoose";
import { userModel } from "./models/user.model";


import { ApolloServer, gql } from "apollo-server-lambda";
import { createMockHandler } from "./lib/server";

const typeDefs = gql`
  type Query {
    hello: String
    findOne: String
    sum(summand1: Int, summand2: Int): Int!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "Hello, persistance!";
    },
    findOne: () => {
      return client.db().collection("users").findOne();
    },
    sum: (_: any, args: { summand1: any; summand2: any }) => {
      return args.summand1 + args.summand2;
    },
  },
};

let cachedDb: Connection;

const connectToDatabase = async () => {
  if (cachedDb) return;

  await mongoose.connect(process.env.MONGODB_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  cachedDb = mongoose.connection;
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    await connectToDatabase();

    return {
      models: {
        userModel,
      },
    };
  }),
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
