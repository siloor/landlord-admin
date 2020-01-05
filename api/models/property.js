'use strict'

module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    name: DataTypes.STRING
  }, {
    paranoid: true
  })

  Property.associate = function (models) {
    Property.belongsToMany(models.User, { through: models.UserProperty })
  }

  return Property
}
