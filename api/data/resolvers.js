'use strict'

const { allUsers, _allUsersMeta, User, createUser, updateUser, deleteUser, signup, login } = require('./resources/users')

const resolvers = {

  Query: {
    allUsers,
    _allUsersMeta,
    User
  },

  Mutation: {
    signup,
    login,

    createUser,
    updateUser,
    deleteUser
  }

}

module.exports = resolvers
