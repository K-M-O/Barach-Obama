// npm modules, controllers, middlewares.

const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')
const checkAuth = require('../middleware/checkAuth')
const checkAdmin = require('../middleware/checkAdmin')

router.use(checkAuth.token,checkAuth.validDate,checkAdmin)

router.get('/adminPanel', adminController.getAdminPanel)
router.get('/manage', adminController.getAdminManage)
router.delete('/manage/:id/', adminController.deleteUser)
router.get('/orders', adminController.getAdminOrders)
router.get('/reports', adminController.getAdminReports)

module.exports = router