const bcrypt = require('bcrypt')
const saltRounds = 10

/**
 * 
 * @param {string} plaintextPassword 
 * @returns {string} hash
 */

const hash = (plaintextPassword) => {
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(plaintextPassword, salt)
}

/**
 * 
 * @param {string} plaintextPassword 
 * @param {string} hash 
 * @returns {boolean} compare the password with hash
 */
const compare = (plaintextPassword, hash) => {
  return bcrypt.compareSync(plaintextPassword, hash)

}

module.exports = {
  hash,
  compare
}