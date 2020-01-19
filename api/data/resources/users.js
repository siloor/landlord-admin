'use strict'

const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const { User } = require('../../models')
const { checkPermission, getListingQuery, getListingCountQuery } = require('../utils')

const resolvers = {
  async allUsers (_, { page, perPage, sortField, sortOrder, filter }, { user }) {
    checkPermission(user, [ User.ROLE_ADMIN, User.ROLE_USER ])

    const query = getListingQuery(page, perPage, sortField, sortOrder, filter)

    if (filter && filter.role) {
      if (!query.where) {
        query.where = {}
      }

      query.where.role = filter.role
    }

    if (user.role === User.ROLE_USER) {
      if (!query.where) {
        query.where = {}
      }

      query.where.id = user.id
    }

    return await User.findAll(query)
  },

  async _allUsersMeta (_, { page, perPage, sortField, sortOrder, filter }, { user }) {
    checkPermission(user, [ User.ROLE_ADMIN, User.ROLE_USER ])

    const query = getListingCountQuery(page, perPage, sortField, sortOrder, filter)

    if (filter && filter.role) {
      if (!query.where) {
        query.where = {}
      }

      query.where.role = filter.role
    }

    if (user.role === User.ROLE_USER) {
      if (!query.where) {
        query.where = {}
      }

      query.where.id = user.id
    }

    return {
      count: await User.count(query)
    }
  },

  async User (_, { id }, { user }) {
    checkPermission(user, [ User.ROLE_ADMIN, User.ROLE_USER ])

    const query = { where: { id: id } }

    if (user.role === User.ROLE_USER) {
      query.where.id = user.id
    }

    return await User.findOne(query)
  },

  async createUser (_, { username, email, password, role }, { user }) {
    checkPermission(user, [ User.ROLE_ADMIN ])

    return await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      role
    })
  },

  async updateUser (_, { id, username, email, password, role }, { user }) {
    checkPermission(user, [ User.ROLE_ADMIN, User.ROLE_USER ])

    const query = { where: { id: id } }

    if (user.role === User.ROLE_USER) {
      query.where.id = user.id
    }

    const userObject = await User.findOne(query)

    if (!userObject) {
      throw new Error('User not found!')
    }

    const changes = {
      username,
      email
    }

    if (user.role === User.ROLE_ADMIN) {
      changes.role = role
    }

    if (password) {
      changes.password = await bcrypt.hash(password, 10)
    }

    await userObject.update(changes)

    return userObject
  },

  async deleteUser (_, { id }, { user }) {
    checkPermission(user, [ User.ROLE_ADMIN ])

    const userObject = await User.findByPk(id)

    if (!userObject) {
      throw new Error('User not found!')
    }

    await userObject.destroy()

    return userObject
  },

  async signup (_, { username, email, password, role }) {
    if (role === User.ROLE_ADMIN) {
      throw new Error('Role not allowed!')
    }

    const user = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      role
    })

    return jsonwebtoken.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1y' }
    )
  },

  async login (_, { email, password }) {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      throw new Error('No user with that email')
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      throw new Error('Incorrect password')
    }

    return jsonwebtoken.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1y' }
    )
  }
}

module.exports = resolvers
