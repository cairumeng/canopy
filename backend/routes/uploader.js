const router = require('koa-router')()
const koaFrom = require('formidable-upload-koa')
const saveFile = require('../services/saveFile')

router.post('/api/upload_file', koaFrom(), async (ctx, next) => {
    const file = ctx.req.files['file']
    if (!file) {
        ctx.body = {
            errors: {file:'No file uploaded'}
        }
        return
    }
    const { size, path, name } = file

    ctx.body = await saveFile({
        name,
        size,
        pathFile: path
    })
})

module.exports = router