'use strict'
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    'product',
    {
      name: DataTypes.STRING,
      brand: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(8, 2),
    },
    {
      // defaultScope: {},
      // scopes: {
      //   deleted: {
      //     where: {
      //       deleted: true,
      //     },
      //   },
      // },
    }
  )
  product.associate = function(models) {
    //产品和创造用户
    product.belongsTo(models.user, { foreignKey: 'userId', as: 'owner' })

    //产品和图片
    product.hasMany(models.product_image, {
      foreignKey: 'productId',
      as: 'images',
    })

    //产品和分类
    product.belongsToMany(models.category, {
      through: models.product_category,
      foreignKey: 'productId',
      otherKey: 'categoryId',
      as: 'categories',
      onDelete: 'cascade',
    })

    //产品和喜欢用户
    product.belongsToMany(models.user, {
      through: models.like,
      foreignKey: 'productId',
      otherKey: 'userId',
      as: 'likedUsers',
      onDelete: 'cascade',
    })
  }
  return product
}
