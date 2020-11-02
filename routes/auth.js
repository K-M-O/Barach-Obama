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

router.post('/login', checkNoAuth, authController.postAuthLogIn)
router.post('/token', authController.postAuthToken)
router.post('/signup', checkNoAuth, authController.postAuthSignUp)

router.delete('/logout', checkAuth.token, checkAuth.validDate, authController.deleteAuthLogOut)

module.exports = router