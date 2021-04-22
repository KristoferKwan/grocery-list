const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {validationResult} = require('express-validator');
const User = require('../models/User');
const GroceryList = require('../models/GroceryList');
const {
  isEmpty,
  empty,
} = require('../helpers/validations');

const {
  errorMessage, successMessage, status,
} = require('../helpers/status');


/**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
      errorMessage.error = errors.array()
        return res.status(400).json(errorMessage);
    }

    const {email, password} = req.body;

    try { 
        let user = await User.findOne({email});
        if (user) {
          errorMessage.error = "User already exists";
          return res.status(status.error).json(errorMessage);
        }

        user = new User({email, password});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        
        const payload = {
            user: {
                id: user.id
            }
        };

        // Create user's template
        const templateFields = {
          user_id: user.id
        };
        const groceryList = new GroceryList(templateFields);
        await groceryList.save();

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600
        }, (err, token) => {
            if (err) {
                throw err;
            }
            res.cookie('jwt', token, { httpOnly: true });
            successMessage.data = {
              email: email,
              token}
            return res.status(status.created).send(successMessage);
    });

    } catch (err) {
      errorMessage.error = "Server error: " + err.message;
      return res.status(status.error).send(errorMessage);
    }
};

/**
   * Signin
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
const signinUser = async (req, res) => {
  const errors = validationResult(req);
  console.log(req.body);  
  if (! errors.isEmpty()) {
    errorMessage.error = errors.array().toString();
    return res.status(status.error).json(errorMessage);
  }

  const {email, password} = req.body;

  try { 
      let user = await User.findOne({email});
      if (!user) {
        errorMessage.error = "Invalid Credentials";
        return res.status(status.error).json(errorMessage);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (! isMatch) {
        errorMessage.error = "Invalid Credentials";
        return res.status(status.error).json(errorMessage);
      }

      const payload = {
          user: {
              id: user.id
          }
      };
      jwt.sign(payload, config.get('jwtSecret'), {
          expiresIn: 3600
      }, async (err, token) => {
          if (err) {
              throw err;
          }
          res.cookie('jwt', token, { httpOnly: true });
          successMessage.data = {
            email: email,
            token
          }
          res.status(status.created).send(successMessage);
      });

  } catch (err) {
    errorMessage.error = JSON.stringify(err.message);   
    res.status(status.error).send(errorMessage);
  }
}

module.exports = {
  createUser,
  signinUser
};