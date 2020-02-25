'use strict'

const faker = require('faker')
const bcrypt = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = []
    for (let i = 0; i < 50; i++) {
      users.push({
        name: faker.name.findName(),
        nickname: faker.internet.userName(),
        email: faker.internet.email(),
        password: bcrypt.hash('123456'),
        avatar: faker.internet.avatar(),
        description: faker.company.catchPhraseDescriptor(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      })
    }

    return queryInterface.bulkInsert('users', users, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, { truncate: true })
  },
}
