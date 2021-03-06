require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
/**
   * Hash Password Method
   * @param {string} password
   * @returns {Promise<string>} returns hashed password
   */
const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}
  
  /**
     * comparePassword
     * @param {string} hashPassword
     * @param {string} password
     * @returns {Promise<Boolean>} return True or False
     */
const comparePassword = (hashedPassword, password) => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * isValidEmail helper method
 * @param {string} email
 * @returns {Boolean} True or False
 */
const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
const validatePassword = (password) => {
  if (password.length <= 5 || password === '') {
    return false;
  } return true;
};
/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  } return true;
};

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
};
  
const generateUserToken = (email, id, first_name, last_name) => {
  const token = jwt.sign({
    email,
    user_id: id,
    first_name,
    last_name
  },
  process.env.SECRET, {expiresIn: '3d'});
  return token
}

  module.exports = {
    isValidEmail,
    validatePassword,
    isEmpty,
    empty,
    generateUserToken,
    hashPassword,
    comparePassword
  };