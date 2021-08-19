// resolvers.ts
import { Resolvers, Token, User } from "./generated/graphql";

const userResolver = {
  Query: {
    user: async (_, { email, name, password }, { models: { userModel } }) => {
      const user = await userModel.findById({ _id: id }).exec();
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { id }, { models: { userModel } }) => {
      const user = await userModel.create({ email, name, password });
      return user;
    },
  },
};
