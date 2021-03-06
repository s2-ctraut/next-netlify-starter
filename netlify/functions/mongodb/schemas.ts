// src/schemas.ts
import { gql } from "apollo-server";

const userSchema = gql`
  type User {
    id: ID!
    email: String!
    name: String!
  }

  type Token {
    token: String!
  }

  type Query {
    me(i: String): User!
    user(id: ID!): User!
    login(email: String!, password: String!): Token!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
  }
`;

export const typeDefs = userSchema;
