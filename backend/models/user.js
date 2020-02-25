'use strict'
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      name: DataTypes.STRING,
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {}
  )
  user.associate = function(models) {
    //创造用户和产品
    user.hasMany(models.product, { onDelete: 'cascade' })

    //喜欢用户和产品
    user.belongsToMany(models.product, {
      through: models.like,
      foreignKey: 'userId',
      otherKey: 'productId',
      as: 'likedProducts',
      onDelete: 'cascade',
    })
  }
  return user
}
