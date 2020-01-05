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

  type Property {
    id: ID!
    name: String!
  }

  type Query {
    allUsers(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: UserFilter): [User]
    _allUsersMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: UserFilter): ListMetadata
    User(id: ID!): User

    allProperties(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: PropertyFilter): [Property]
    _allPropertiesMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: PropertyFilter): ListMetadata
    Property(id: ID!): Property
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

    createProperty(
      name: String!
    ): Property
    updateProperty(
      id: ID!
      name: String!
    ): Property
    deleteProperty(id: ID!): Property
  }

  type ListMetadata {
    count: Int!
  }
  
  input UserFilter {
    ids: [ID]
    role: UserRoles
  }

  input PropertyFilter {
    ids: [ID]
  }
`

module.exports = { typeDefs, resolvers }
