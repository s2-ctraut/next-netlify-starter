// src/server.ts
import {
  ApolloServer as ApolloServerLambda,
  AuthenticationError,
} from "apollo-server-lambda";
import { ApolloServer } from "apollo-server";

import mongoose, { Connection } from "mongoose";

// import { userModel } from "./models/user.model";
import { userModel } from "./model";

import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

import { IncomingHttpHeaders } from "http";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventHeaders,
  Context,
} from "aws-lambda";
import jwt from "jsonwebtoken";
const checkAuth = async ({
  token,
}: APIGatewayProxyEventHeaders | IncomingHttpHeaders) => {
  if (typeof token === "string") {
    try {
      return await jwt.verify(token, "riddlemethis2");
    } catch (e) {
      throw new AuthenticationError(`Your session expired. Sign in again.`);
    }
  }
};

const createLambdaServer = async (
  { headers }: APIGatewayProxyEvent,
  context: Context
) => {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    context: async () => {
      await connectToDatabase();

      const auth = await checkAuth(headers);

      return {
        auth,
        models: {
          userModel,
        },
      };
    },
  });
};

function createLocalServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    context: async ({ req: { headers } = {} }) => {
      const auth = await checkAuth(headers);
      await connectToDatabase();

      return {
        auth,
        models: {
          userModel,
        },
      };
    },
  });
}

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

export { createLambdaServer, createLocalServer };
