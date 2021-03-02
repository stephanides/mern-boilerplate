import { gql } from 'apollo-server-express';

const rootTypeDefs = gql`
  type Query {
    users: [User]
  }

  type Mutation {
    loginUser(userLoginInput: UserLoginInput!): UserLogged
    registerUser(userRegInput: UserRegInput!): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default rootTypeDefs;
