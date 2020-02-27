const Product = require('../models').product
const Like = require('../models').like
const Sequelize = require('sequelize')

const getProducts = async (pageIndex, pageSize = 18, searchText) => {
  const whereOpt = {
    limit: pageSize,
    offset: pageIndex * pageSize,
  }
  if (searchText.length > 2) {
    whereOpt.where = {
      name: {
        [Sequelize.Op.like]: `%${searchText}%`,
      },
    }
  }
  const result = await Product.findAndCountAll(whereOpt)

  return {
    products: await Promise.all(
      result.rows.map(async row => {
        return {
          ...row.dataValues,
          images: await row.getImages(),
          likedUsers: await row.getLikedUsers(),
        }
      })
    ),
    count: result.count,
  }
}

const getProduct = async id => {
  const product = await Product.findOne({
    where: {
      id,
    },
  })

  return {
    ...product.dataValues,
    images: await product.getImages(),
    likedUsers: await product.getLikedUsers(),
    owner: await product.getOwner(),
  }
}

const toggleLike = async (userId, productId) => {
  const result = await Like.findOne({
    where: {
      userId,
      productId,
    },
  })

  if (result) {
    await Like.destroy({
      where: {
        userId,
        productId,
      },
    })
    return false
  }
  await Like.create({
    userId,
    productId,
  })
  return true
}

module.exports = {
  getProducts,
  getProduct,
  toggleLike,
}
