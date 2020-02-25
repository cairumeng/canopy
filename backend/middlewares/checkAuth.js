const checkAuth = async (ctx, next) => {
  const authUser = ctx.authUser
  if (!authUser) {
    ctx.status = 401
    ctx.body = {
      errors: { user: 'Unauthorized' },
    }
    return
  }
  await next()
}

module.exports = checkAuth
