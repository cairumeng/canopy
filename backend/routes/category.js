const router = require('koa-router')()
const {
  getCategories,
  getCategory,
  getCategoryProducts,
} = require('../services/categories')
const { CategoryCollection } = require('../resources/CategoryResource')
const { ProductCollection } = require('../resources/ProductResource')

router.prefix('/api/categories')

router.get('/', async (ctx, next) => {
  const categories = await getCategories()
  ctx.body = CategoryCollection(categories)
})

router.get('/:id', async (ctx, next) => {
  let { pageIndex = 1, pageSize = 18 } = ctx.request.query
  const id = ctx.params.id
  const result = await getCategoryProducts(id, pageIndex, pageSize)
  const category = await getCategory(id)
  const products = ProductCollection(
    result.products,
    result.count,
    pageIndex,
    pageSize
  )
  ctx.body = { ...products, categoryName: category.name }
})

module.exports = router
