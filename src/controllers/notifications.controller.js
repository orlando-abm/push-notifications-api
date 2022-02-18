const admin = require('firebase-admin');
const customerController = require('./customer.controller')

const sendNotification = async (req, res) => {
    try {
        const { email, message } = req.body
        let devices = await customerController.getCustomerDevices(email)
        for (i = 0; i < Object.keys(devices).length; i++) {
            let msg = {
              token: devices[i].id,
              ...message
            }
            admin.messaging().send(msg)
            .then(() => {
              console.log('Notificacion enviada');
            })
            .catch(e => {
                console.log(e)
                throw e
            })
          }
          res.status(200).json({
            status: 200,
            success: true,
            message: 'Notification sent successfully'
          })
    } catch (e) {
        res.status(400).json({
            status: 400,
            success: false,
            message: e
        })
    }

}

module.exports = {
    sendNotification
}