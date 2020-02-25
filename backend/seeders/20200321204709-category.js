'use strict'
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const categories = [
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/nrivokjv917og5igpf4s1.jpg',
        name: 'Art & Design Books',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/jwykwsnfvbtddavr7jeu1.jpg',
        name: 'Artwork',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/vt6lruvgnsxradazorsw1.jpg',
        name: 'Backpacks',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/mcmcyymdgr3vaetajcgd1.jpg',
        name: 'Baking Accessories',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/b6idmd53prjuumugteta.jpg',
        name: 'Barware',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/nqroxgksloqgntcojicz.jpg',
        name: 'Bath',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/ugl5cwr1hkjeaafzg7do.jpg',
        name: 'Blocks',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/kgotseliufmetsuszh3w.jpg',
        name: 'Books',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/dvh0ecvkh9en3y06mp8l.jpg',
        name: 'Cameras',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/jphgnvjeh4j5lvtcxklu.jpg',
        name: 'Camping Gear',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/ddykmwkjjvu5asqxkvyt.jpg',
        name: 'Candles',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/hnodwssmsuktf8qkqzgv.jpg',
        name: 'Clocks',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/uucmj3zmrh8zjm1vpoej.jpg',
        name: 'Coffee and Tea',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/pdlngtrqejs4rqaqklho.jpg',
        name: 'Cookbooks',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/n3ghjbs2kfhwis69l4t5.jpg',
        name: 'Cookware',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/dsjyv7m9twecyj5lpo9r.jpg',
        name: 'Desk Accessories',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/tjnim1vmz7od59ngdzws.jpg',
        name: 'Dinnerware',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/jvpgq2onghhafj4kehwg.jpg',
        name: 'Everyday Carry',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/hhceskfluwq39e9us1xc.jpg',
        name: 'Exercise Equipment',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/qjd0zk6c5vdjzsv8glz0.jpg',
        name: 'Furniture',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/fwzwstvfnakqkgk1mr8w.jpg',
        name: 'Gardening',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/aorgczwyewijj1mepdhx.jpg',
        name: 'Glassware',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/m08bn1hgj2eeqr5n6jwg.jpg',
        name: 'Grooming',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/cxyfa4tadxlzayy8pp7m.jpg',
        name: 'Hair Care',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/d1woc4drmoocqqli0vwb.jpg',
        name: 'Headphones',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/nj4y9mxoxwdnwxcrmgl2.jpg',
        name: 'Home',
      },
      {
        avatar:
          'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_lpad,w_300,h_300/i9gzlooks5bbbxnqtszx.jpg',
        name: 'Home Accents',
      },
    ]
    return queryInterface.bulkInsert(
      'Categories',
      categories.map(cat => ({
        ...cat,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      })),
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {})
  },
}
