// express, controllers, middlewares.

const express = require('express')
const router = express.Router()
const mainController = require('../controllers/index')

router.get('/', mainController)

module.exports = router