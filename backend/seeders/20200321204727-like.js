'use strict'

const faker = require('faker')
const User = require('../models').user
const Product = require('../models').product

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await Product.findAll()

    const users = await User.findAll()

    const likes = []

    products.map(product => {
      for (let i = 0; i < 5; i++) {
        let user = faker.random.arrayElement(users)
        likes.push({
          productId: product.id,
          userId: user.id,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        })
      }
    })
    return queryInterface.bulkInsert('Likes', likes, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Likes', null, {})
  },
}
