// https://thecodest.co/blog/deploy-graphql-mongodb-api-using-netlify-functions/
// https://github.com/GraphQLGuide/apollo-datasource-mongodb/

import { IncomingHttpHeaders } from "http";
import { APIGatewayProxyEventHeaders } from "aws-lambda";

import { HandlerEvent, HandlerContext } from "@netlify/functions";
import mongoose, { Connection } from "mongoose";
import { userModel } from "./mongodb/model";

import { ApolloServer } from "apollo-server-lambda";
import { AuthenticationError } from "apollo-server";
import { createMockHandler } from "./lib/server";

import jwt from "jsonwebtoken";

import { typeDefs } from "./mongodb/schemas";
import { resolvers } from "./mongodb/resolvers";

require("dotenv").config();

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

const checkAuth = async ({
  authorization,
}: APIGatewayProxyEventHeaders | IncomingHttpHeaders) => {
  if (typeof authorization === "string") {
    try {
      const token = authorization.split(" ")[1];
      return jwt.verify(token, "b8A7cBodqPkaqD");
    } catch (e) {
      throw new AuthenticationError(`Your session expired. Sign in again.`);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (invoke) => {
    const auth = await checkAuth(invoke.event.headers || {});
    await connectToDatabase();

    return {
      auth,
      models: {
        userModel,
      },
    };
  },
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
