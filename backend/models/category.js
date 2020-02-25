'use strict'
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    'category',
    {
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {}
  )
  category.associate = function(models) {
    category.belongsToMany(models.product, {
      through: models.product_category,
      foreignKey: 'categoryId',
      otherKey: 'productId',
      as: 'products',
      onDelete: 'cascade',
    })
  }
  return category
}
