const CategoryResource = category => {
  // 单个对象
  return {
    id: category.id,
    name: category.name,
    avatar: category.avatar,
  }
}

const CategoryCollection = categories => {
  return {
    categories: categories.map(category => CategoryResource(category)),
  }
}

module.exports = {
  CategoryResource,
  CategoryCollection,
}
