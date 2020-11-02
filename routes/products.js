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
router.post('/new', checkAdmin, productController.postNewProductCreateProduct, productController.postNewProductSaveImages, productController.postNewProductReport)
router.post('/:id/update', checkAdmin, productController.updateProductCheckEmpty, productController.updateProductComplete, productController.updateProductReport)
router.delete('/:id/delete', checkAdmin, productController.removeProduct, productController.removeProductReport)

module.exports = router