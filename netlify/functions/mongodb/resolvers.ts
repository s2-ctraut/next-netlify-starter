// resolvers.ts
import { Resolvers, Token, User } from "./generated/graphql";
import bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

// const userResolver: Resolvers = {
export const resolvers: Resolvers = {
  Query: {
    user: async (_, { id }, { models: { userModel }, auth }): Promise<User> => {
      if (!auth) throw new AuthenticationError("You are not authenticated");

      const user = await userModel.findById({ _id: id }).exec();
      return user;
    },
    login: async (
      _,
      { email, password },
      { models: { userModel } }
    ): Promise<Token> => {
      const user = await userModel.findOne({ email }).exec();

      if (!user) throw new AuthenticationError("Invalid credentials");

      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) throw new AuthenticationError("Invalid credentials");

      const token = jwt.sign({ id: user.id }, "riddlemethis", {
        expiresIn: 60,
      });

      console.log("token");
      console.log(token);

      return { token };
    },
  },
  Mutation: {
    createUser: async (
      _,
      { email, name, password },
      { models: { userModel } }
    ): Promise<User> => {
      const user = await userModel.create({
        email,
        name,
        password,
      });
      return user;
    },
  },
};
