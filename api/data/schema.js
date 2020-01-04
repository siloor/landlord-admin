'use strict'

const { gql } = require('apollo-server-express')
const resolvers = require('./resolvers')
const { User } = require('../models')

const typeDefs = gql`
  enum UserRoles {
    ${User.ROLE_ADMIN}
    ${User.ROLE_USER}
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: UserRoles!
  }

  type Query {
    allUsers(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: UserFilter): [User]
    _allUsersMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: UserFilter): ListMetadata
    User(id: ID!): User
  }

  type Mutation {
    signup (username: String!, email: String!, password: String!, role: String!): String
    login (email: String!, password: String!): String

    createUser(
      username: String!
      email: String!
      password: String!
      role: String!
    ): User
    updateUser(
      id: ID!
      username: String!
      email: String!
      password: String
      role: String!
    ): User
    deleteUser(id: ID!): User
  }

  type ListMetadata {
    count: Int!
  }
  
  input UserFilter {
    ids: [ID]
    role: UserRoles
  }
`

module.exports = { typeDefs, resolvers }
