const router = require('koa-router')()
const {
  isEmailExist,
  isNicknameExist,
  createUser,
  checkUser,
} = require('../services/users')
const { UserResource } = require('../resources/UserResource')
const userValidate = require('../validators/user')
const { validatorMiddleware } = require('../middlewares/validator')

router.prefix('/api/auth')

router.post(
  '/register',
  validatorMiddleware(userValidate),
  async (ctx, next) => {
    const { name, nickname, email, password, avatar } = ctx.request.body
    const isEmailValid = !(await isEmailExist(email))
    const isNicknameValid = !(await isNicknameExist(nickname))

    if (!isEmailValid) {
      ctx.status = 422
      ctx.body = {
        errors: {
          email: 'email does exist',
        },
      }
    } else if (!isNicknameValid) {
      ctx.status = 422
      ctx.body = {
        errors: {
          nickname: 'nickname does exist',
        },
      }
    } else {
      ctx.body = UserResource(
        await createUser({ name, nickname, email, password, avatar })
      )
    }
  }
)

router.post('/login', async (ctx, next) => {
  const { email, password } = ctx.request.body
  const isEmailValid = !(await isEmailExist(email))

  if (isEmailValid) {
    ctx.status = 422
    ctx.body = {
      errors: {
        email: 'email does not exist',
      },
    }
  } else {
    const token = await checkUser({ email, password })
    if (token) {
      ctx.body = token
    } else {
      ctx.status = 401
      ctx.body = {
        errors: {
          password: 'password is not correct',
        },
      }
    }
  }
})

module.exports = router
