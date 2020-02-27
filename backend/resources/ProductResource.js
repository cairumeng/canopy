const ProductResource = product => {
  // 单个对象
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    owner: product.owner,
    price: product.price,
    images: product.images.map(image => image.image),
    likedUsers: product.likedUsers.map(user => ({
      id: user.id,
      avatar: user.avatar,
    })),
  }
}

const ProductCollection = (products, count, pageIndex, pageSize) => {
  return {
    count,
    lastPage: parseInt(Math.ceil(count / pageSize)) - 1,
    pageIndex: parseInt(pageIndex),
    pageSize: parseInt(pageSize),
    products: products.map(product => ProductResource(product)),
  }
}

module.exports = {
  ProductResource,
  ProductCollection,
}
