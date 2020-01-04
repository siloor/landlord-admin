'use strict'

module.exports = (sequelize, DataTypes) => {
  const ROLE_ADMIN = 'admin'
  const ROLE_USER = 'user'

  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM(ROLE_ADMIN, ROLE_USER)
  }, {
    paranoid: true
  })

  User.ROLE_ADMIN = ROLE_ADMIN
  User.ROLE_USER = ROLE_USER

  return User
}
