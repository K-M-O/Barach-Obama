// express, controllers, middlewares.

const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const checkAuth = require('../middleware/checkAuth')
const checkNoAuth = require('../middleware/checkNoAuth')

router.get('/login', authController.getAuthLogIn)
router.get('/signup', authController.getAuthSignUp)
router.get('/token', authController.getAuthToken)
router.get('/logout', authController.getAuthLogOut)

router.post('/login', checkNoAuth, authController.postAuthLogInCheckEmpty, authController.postAuthLogInCheckData, authController.postAuthLogInCompleted, authController.postAuthLogInReport)
router.post('/token', authController.postAuthToken)
router.post('/signup', checkNoAuth, authController.postAuthSignUpCheckEmpty, authController.postAuthSignUpCheckExsit, authController.postAuthSignUpCreateUser, authController.postAuthSignUpReport)

router.delete('/logout', checkAuth.token, checkAuth.validDate, authController.deleteAuthLogOut, authController.deleteAuthLogOutReport)

module.exports = router