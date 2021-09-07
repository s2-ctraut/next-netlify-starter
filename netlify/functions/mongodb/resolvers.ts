// resolvers.ts
import { Resolvers, Token, User } from "./generated/graphql";
import bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

// const userResolver: Resolvers = {
export const resolvers: Resolvers = {
  Query: {
    me: async (_, { i }, { models: { userModel }, auth }): Promise<User> => {
      console.log("auth me: ");
      console.log(auth);
      console.log(i);
      if (!auth) throw new AuthenticationError("You are not authenticated.");

      const user = await userModel.findById({ _id: auth.id }).exec();
      console.log(user);
      return user;
    },

    user: async (_, { id }, { models: { userModel }, auth }): Promise<User> => {
      console.log("auth: ");
      console.log(auth);
      if (!auth)
        throw new AuthenticationError(
          "You are not authenticated for user call"
        );

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

      const id = user.id;
      const token = jwt.sign({ id }, "b8A7cBodqPkaqD", {
        expiresIn: 600,
      });

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
