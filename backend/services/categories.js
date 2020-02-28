const Category = require('../models').category
const ProductCategory = require('../models').product_category
const Product = require('../models').product
const User = require('../models').user
const ProductImage = require('../models').product_image

const getCategories = async () => await Category.findAll()

const getCategory = async id =>
  await Category.findOne({
    where: {
      id,
    },
  })

const getCategoryProducts = async (id, pageIndex, pageSize = 18) => {
  const result = await ProductCategory.findAndCountAll({
    attributes: ['productId'],
    limit: pageSize,
    offset: pageIndex * pageSize,
    where: {
      categoryId: id,
    },
  })

  const productIds = result.rows.map(row => row.dataValues.productId)
  const count = result.count

  const products = await Product.findAndCountAll({
    include: [
      {
        model: ProductImage,
        as: 'images',
        attributes: ['image'],
      },
      {
        model: User,
        as: 'likedUsers',
        attributes: ['id', 'avatar'],
      },
      {
        model: User,
        as: 'owner',
        attributes: ['id', 'nickname', 'avatar'],
      },
    ],
    where: {
      id: productIds,
    },
  })

  return {
    products: products.rows.map(row => row.dataValues),
    count,
  }
}

module.exports = {
  getCategories,
  getCategory,
  getCategoryProducts,
}
