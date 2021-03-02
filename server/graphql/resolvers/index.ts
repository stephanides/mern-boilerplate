// queries
import users from "./query/Users";

// mutations

import loginUser from "./mutation/LoginUser";
import registerUser from "./mutation/RegisterUser";

const resolvers = {
  Query: {
    users: async (root: any, args: any, ctx: any) => users(root, args, ctx),
  },
  Mutation: {
    loginUser: async (root: any, args: any, ctx: any) =>
      loginUser(root, args, ctx),
    registerUser: async (root: any, args: any, ctx: any) =>
      registerUser(root, args, ctx),
  },
};

export default resolvers;
