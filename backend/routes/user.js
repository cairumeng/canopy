const router = require('koa-router')()
const { UserResource } = require('../resources/UserResource')
const { changeInfo, changePassword } = require('../services/users')
const checkAuth = require('../middlewares/checkAuth')

router.prefix('/api/user')

router.get('/profile', checkAuth, async (ctx, next) => {
  ctx.body = UserResource(ctx.authUser)
})

router.patch('/changeInfo', checkAuth, async (ctx, next) => {
  const authUser = ctx.authUser
  const { name, nickname, password, avatar, description } = ctx.request.body
  if (password) {
    await changePassword(authUser, password)
  }
  const user = await changeInfo(authUser, {
    name,
    nickname,
    avatar,
    description,
  })

  ctx.body = UserResource(user)
})

module.exports = router
