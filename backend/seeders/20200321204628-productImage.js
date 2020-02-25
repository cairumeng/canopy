'use strict'

const Product = require('../models').product
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productImages = []

    const products = await Product.findAll()

    const images = [
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/qwzmkhxb71gwkm7yz5av.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/hhxjjhvmgwi5xqqiss1u.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/ulcrd1u2yumbqwtnmihv.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/y11avsutjik4fyexcnsg.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/rri2cl3vdycdbwhopu9v.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/a0gdvgpttp1ggzhf2k7r.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/wsahg5mdkpwvhnqmdwjx.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/nippup0jf1k0ltlgwvhf.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/iau33htphffmw0swigk3.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/s2xstkmzabqhi8bkrpga.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/eeq0sjjqnn2vugympv2m.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/vkeojh1y8ouzecrkqj6i.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/hezl8cabfgokh7u6qn4g.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/rrxwnk78qszllyaqzwk5.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/wpbbo97pha8icnff2uii.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/dn92ghh1rakjjgaqzo0a.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/i6pifpqlkwj3ewcu464z.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fit,w_600,h_600/wulx37xfcymbbbg9ebdt.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/Icon-60_2x.png',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fill,h_96,w_96/rfkrcxkaet8oexthc1nu.jpg',
      'https://res.cloudinary.com/hcu8jcnmr/image/upload/c_fill,h_192,w_192/rfkrcxkaet8oexthc1nu.jpg',
    ]
    products.forEach(product => {
      let j = (faker.random.number() % 3) + 1
      for (let i = 0; i < j; i++) {
        productImages.push({
          productId: product.id,
          image: faker.random.arrayElement(images),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        })
      }
    })

    return queryInterface.bulkInsert('product_images', productImages, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_images', null, {})
  },
}
