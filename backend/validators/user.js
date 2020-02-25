const validate = require('./validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2,
    },
    nickname: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2,
    },
    email: {
      format: 'email',
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 6,
    },
  },
}

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
const userValidate = (data = {}) => {
  return validate(SCHEMA, data)
}

module.exports = userValidate
