// express, controllers, middlewares.

const express = require('express')
const router = express.Router()
const mainController = require('../controllers/index')

router.get('/', mainController.getLang)
router.post('/', mainController.setLang)

module.exports = router