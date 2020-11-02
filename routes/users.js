// express, controllers, middlewares.

const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const checkAuth = require('../middleware/checkAuth')
const checkAdmin = require('../middleware/checkAdmin')

router.use(checkAuth.token,checkAuth.validDate)

router.get('/profile',userController.getUserProfile)
router.get('/manage',userController.getUserMangae)
router.get('/inbox',userController.getUserInbox)
router.get('/message', checkAdmin, userController.getMessage)

router.post('/manage/update',userController.postUserUpdate)
router.post('/message', checkAdmin, userController.postMessage)

router.delete('/manage/delete',userController.deleteUser)

module.exports = router