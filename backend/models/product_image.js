'use strict'
module.exports = (sequelize, DataTypes) => {
  const product_image = sequelize.define(
    'product_image',
    {
      productId: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {}
  )
  product_image.associate = function(models) {
    // associations can be defined here
  }
  return product_image
}
