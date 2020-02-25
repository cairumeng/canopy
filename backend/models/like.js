'use strict'
module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define(
    'like',
    {
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {}
  )
  like.associate = function(models) {}
  return like
}
