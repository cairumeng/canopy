const User = require('../models').user
const { hash, compare } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const { DEFAULT_AVATAR } = require('../config/const')

const isEmailExist = async email => {
  const user = await User.findOne({
    attributes: ['email'],
    where: {
      email,
    },
  })

  return user !== null
}

const isNicknameExist = async nickname => {
  const user = await User.findOne({
    where: {
      nickname,
    },
  })
  return user !== null
}

const createUser = async ({ name, nickname, email, password, avatar }) => {
  return await User.create({
    name,
    nickname,
    email,
    password: hash(password),
    avatar: avatar || DEFAULT_AVATAR,
  })
}

const checkUser = async ({ email, password }) => {
  const user = await User.findOne({
    where: {
      email,
    },
  })
  if (user && compare(password, user.password)) {
    return jwt.sign(user.id, process.env.JWT_SECRET)
  }
  return false
}

const changeInfo = async (
  authUser,
  { name, nickname, avatar, description }
) => {
  return await authUser.update({
    name,
    nickname,
    avatar,
    description,
  })
}

const changePassword = async (authUser, password) => {
  return await authUser.update({
    password: hash(password),
  })
}

module.exports = {
  isEmailExist,
  isNicknameExist,
  createUser,
  checkUser,
  changeInfo,
  changePassword,
}
