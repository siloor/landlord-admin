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

  User.associate = function (models) {
    User.belongsToMany(models.Property, { through: models.UserProperty })
  }

  User.getPropertyIds = async (id) => {
    const user = await User.findOne({ where: { id: id } })

    const properties = await user.getProperties()

    return properties.map(property => property.get('id'))
  }

  User.ROLE_ADMIN = ROLE_ADMIN
  User.ROLE_USER = ROLE_USER

  return User
}
