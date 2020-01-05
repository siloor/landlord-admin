'use strict'

const { allUsers, _allUsersMeta, User, createUser, updateUser, deleteUser, signup, login } = require('./resources/users')
const { allProperties, _allPropertiesMeta, Property, createProperty, updateProperty, deleteProperty } = require('./resources/properties')

const resolvers = {

  Query: {
    allUsers,
    _allUsersMeta,
    User,

    allProperties,
    _allPropertiesMeta,
    Property
  },

  Mutation: {
    signup,
    login,

    createUser,
    updateUser,
    deleteUser,

    createProperty,
    updateProperty,
    deleteProperty
  }

}

module.exports = resolvers
