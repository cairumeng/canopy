const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const dotenv = require('dotenv')
const authUser = require('./middlewares/authUser')
dotenv.config() // 把.env文件里的参数放到nodejs自带的process.env中

//路由引入
const auth = require('./routes/auth')
const uploader = require('./routes/uploader')
const user = require('./routes/user')
const product = require('./routes/product')
const category = require('./routes/category')

// error handler
onerror(app)

// middlewares
app.use(cors())
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
)
app.use(authUser)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// routes
app.use(auth.routes(), auth.allowedMethods())
app.use(uploader.routes(), uploader.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(product.routes(), product.allowedMethods())
app.use(category.routes(), category.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
