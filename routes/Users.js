const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const auth = require('../middleware/auth')
const { signinUser, createUser } = require('../controllers/Users');
const {
  errorMessage, successMessage, status,
} = require('../helpers/status');
const User = require('../models/User');

// @route       GET api/auth
// @desc        Test route
// @access      Public
router.get('/', auth, async (req, res) => {
    try { // Find user information - password from User collection
      const user = await User.findById(req.user.id).select('-password');
      successMessage.data = user;
      res.status(status.success).send(successMessage);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST api/auth/register
// @desc        Create new account & get token
// @access      Public
router.post('/register', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 9 or more characters').isLength(
        {min: 9}
    )
], createUser);

// @route       POST api/auth/signin
// @desc        Authenticate user & get token
// @access      Public
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], signinUser);


router.get('/logout', (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  return res.status(status.success).send('user is logged out');
})

module.exports = router;
