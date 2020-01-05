'use strict'

const { Property, UserProperty, User, sequelize } = require('../../models')
const { checkPermission, getListingQuery, getListingCountQuery } = require('../utils')

const resolvers = {
  async allProperties (_, { page, perPage, sortField, sortOrder, filter }, { user }) {
    checkPermission(user, [ User.ROLE_ADMIN, User.ROLE_USER ])

    const query = getListingQuery(page, perPage, sortField, sortOrder, filter)

    if (user.role === User.ROLE_USER) {
      query.include = [{
        model: User,
        where: {
          id: user.id
        }
      }]
    }

    return await Property.findAll(query)
  },

  async _allPropertiesMeta (_, { page, perPage, sortField, sortOrder, filter }, { user }) {
    checkPermission(user, [ User.ROLE_ADMIN, User.ROLE_USER ])

    const query = getListingCountQuery(page, perPage, sortField, sortOrder, filter)

    if (user.role === User.ROLE_USER) {
      query.include = [{
        model: User,
        where: {
          id: user.id
        }
      }]
    }

    return {
      count: await Property.count(query)
    }
  },

  async Property (_, { id }, { user }) {
    checkPermission(user, [ User.ROLE_ADMIN, User.ROLE_USER ])

    const query = { where: { id: id } }

    if (user.role === User.ROLE_USER) {
      query.include = [{
        model: User,
        where: {
          id: user.id
        }
      }]
    }

    const property = await Property.findOne(query)

    return property
  },

  async createProperty (_, { name }, { user }) {
    checkPermission(user, [ User.ROLE_ADMIN, User.ROLE_USER ])

    let transaction

    try {
      transaction = await sequelize.transaction()

      const property = await Property.create(
        {
          name
        }, {
          transaction
        }
      )

      await UserProperty.create(
        {
          UserId: user.id,
          PropertyId: property.id,
          role: UserProperty.ROLE_LANDLORD
        }, {
          transaction
        }
      )

      await transaction.commit()

      return property
    } catch (err) {
      if (transaction) await transaction.rollback()

      throw err
    }
  },

  async updateProperty (_, { id, name }, { user }) {
    checkPermission(user, [ User.ROLE_ADMIN, User.ROLE_USER ])

    const query = { where: { id: id } }

    if (user.role === User.ROLE_USER) {
      query.include = [{
        model: User,
        where: {
          id: user.id
        },
        through: {
          where: {
            role: UserProperty.ROLE_LANDLORD
          }
        }
      }]
    }

    const property = await Property.findOne(query)

    if (!property) {
      throw new Error('Property not found!')
    }

    await property.update({ name })

    return property
  },

  async deleteProperty (_, { id }, { user }) {
    checkPermission(user, [ User.ROLE_ADMIN, User.ROLE_USER ])

    const query = { where: { id: id } }

    if (user.role === User.ROLE_USER) {
      query.include = [{
        model: User,
        where: {
          id: user.id
        },
        through: {
          where: {
            role: UserProperty.ROLE_LANDLORD
          }
        }
      }]
    }

    const property = await Property.findOne(query)

    if (!property) {
      throw new Error('Property not found!')
    }

    await property.destroy()

    return property
  }
}

module.exports = resolvers
