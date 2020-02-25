'use strict'
const faker = require('faker')
const Product = require('../models').product
const Category = require('../models').category

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await Product.findAll()

    const categories = await Category.findAll()

    const productCategories = []

    products.map(product => {
      for (let i = 0; i < 2; i++) {
        let category = faker.random.arrayElement(categories)
        productCategories.push({
          productId: product.id,
          categoryId: category.id,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        })
      }
    })
    return queryInterface.bulkInsert(
      'Product_categories',
      productCategories,
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Product_categories', null, {})
  },
}
