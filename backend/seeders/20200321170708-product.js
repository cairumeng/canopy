'use strict'

const User = require('../models').user
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = []

    const users = await User.findAll()

    users.forEach(user => {
      for (let i = 0; i < 20; i++) {
        products.push({
          name: faker.commerce.productName(),
          brand: faker.company.companyName(),
          price: faker.commerce.price(),
          userId: user.id,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        })
      }
    })

    return queryInterface.bulkInsert('products', products, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {})
  },
}
