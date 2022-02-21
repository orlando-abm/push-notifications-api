const express = require('express')
const router = express.Router();
const customerController = require('./../controllers/customer.controller')

router.post('/addDevice', customerController.addTokenDevice)
router.delete('/deleteDevice', customerController.deleteTokenDevice)

module.exports = router