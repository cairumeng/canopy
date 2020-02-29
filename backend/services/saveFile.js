const fse = require('fs-extra')
const path = require('path')

// 文件最大体积 1M
const MAX_SIZE = 1024 * 1024 * 1024

const DIST_FOLDER_PATH = path.join(__dirname, '..',  'public', 'uploadFiles')
// process.cwd() + '/public/uploadFiles'
// process.cwd() always returns the same value: the absolute path of where you started the Node.js process

const saveFile = async ({ size, pathFile, name }) => {
    if (size > MAX_SIZE) {
        await fse.remove(pathFile)
        return {
            error: 'Exceed file size limit'
        }
    }

    const fileName = (Date.now() + '_' + Math.random()).substr(10) + '_' + name  
    // avoid duplication
    const destFilePath = path.join(DIST_FOLDER_PATH, fileName)
    await fse.move(pathFile, destFilePath)

    // 返回信息
    return {
        url: process.env.SERVER_URL + '/uploadFiles/' + fileName
    }
}

module.exports = saveFile