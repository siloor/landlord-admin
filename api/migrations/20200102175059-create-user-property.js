'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserProperties', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
      },
      PropertyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Properties', key: 'id' }
      },
      role: {
        type: Sequelize.ENUM,
        values: ['landlord', 'tenant'],
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })

    return queryInterface.addConstraint('UserProperties', ['UserId', 'PropertyId'], {
      type: 'unique',
      name: 'UniqueUserProperty'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserProperties')
  }
}
