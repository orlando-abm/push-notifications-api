const express = require('express')
const router = express.Router();
const notificationController = require('./../controllers/notifications.controller')

router.post('/sendNotification', notificationController.sendNotification)

module.exports = router