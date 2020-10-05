const express = require('express')
const router = express.Router()

const { createAccount, signIn } = require('../services/users.service')

const {
  validateCreateAccount,
  valdiateSignIn,
} = require('../middlewares/validations/user.validations')

router.post('/', validateCreateAccount, createAccount)
router.post('/signIn', valdiateSignIn, signIn)
module.exports = router
