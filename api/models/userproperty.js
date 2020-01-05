'use strict'

module.exports = (sequelize, DataTypes) => {
  const ROLE_LANDLORD = 'landlord'
  const ROLE_TENANT = 'tenant'

  const UserProperty = sequelize.define('UserProperty', {
    UserId: DataTypes.INTEGER,
    PropertyId: DataTypes.INTEGER,
    role: DataTypes.ENUM(ROLE_LANDLORD, ROLE_TENANT)
  }, {
    paranoid: true
  })

  UserProperty.ROLE_LANDLORD = ROLE_LANDLORD
  UserProperty.ROLE_TENANT = ROLE_TENANT

  return UserProperty
}
