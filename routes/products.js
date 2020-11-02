// express, controllers, middlewares.

const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')
const checkAuth = require('../middleware/checkAuth')
const checkAdmin = require('../middleware/checkAdmin')

router.get('/:id/show', productController.getProduct)
router.use(checkAuth.token,checkAuth.validDate)
router.post('/:id/order', productController.orderProduct)

router.get('/new', checkAdmin, productController.getNewProduct)
router.post('/new', checkAdmin, productController.postNewProduct)
router.post('/:id/update', checkAdmin, productController.updateProduct)
router.delete('/:id/delete', checkAdmin, productController.removeProduct)

module.exports = router