const jwt = require('jsonwebtoken')
const User = require('../models').user

/**
 * 生成 json schema 验证的中间件
 * @param {function} validateFn 验证函数
 * @returns {function} middleWare
 */
// 定义中间件函数
const getAuthUser = async (ctx, next) => {
  const authorization = ctx.request.header['authorization']
  if (authorization) {
    const token = authorization.split(' ')[1]
    ctx.authUser = await User.findOne({
      where: {
        id: jwt.decode(token),
      },
    })
  }

  // 取得成功，继续
  await next()
}

module.exports = getAuthUser
