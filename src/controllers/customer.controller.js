require('dotenv').config()
const axios = require('axios');
const { TrackClient, RegionUS } = require('customerio-node');

const addTokenDevice = async (req, res) => {
    try {
        let cio = new TrackClient(process.env.SITE_ID, process.env.API_KEY, { region: RegionUS });
        const { email, platform, deviceId } = req.body
        let resp = await cio.addDevice(
            email,
            deviceId,
            platform,
            { primary: true })
        res.status(200).json({
            status: 200,
            success: true,
            message: resp
        })
    } catch (e) {
        res.status(400).json({
            status: 400,
            success: false,
            message: e
        })
    }

}

const deleteTokenDevice = async (req, res) => {
    try {
        let cio = new TrackClient(process.env.SITE_ID, process.env.API_KEY, { region: RegionUS });
        const { email, deviceId } = req.body
        let resp = await cio.deleteDevice(email, deviceId)
        res.status(200).json({
            status: 200,
            success: true,
            message: resp
        })
    } catch (e) {
        res.status(400).json({
            status: 400,
            success: false,
            message: e
        })
    }

}

const _getCustomerId = async (email) => {
    try {
        let userID = await axios({
            method: 'GET',
            url: `https://beta-api.customer.io/v1/api/customers?email=${email}`,
            headers: {
                Authorization: `Bearer ${process.env.API_KEY_APP}`
            }
        })
        const { results } = userID.data
        if (results.length < 1) throw `User ${email} not found`
        return results[0].id
    } catch (e) {
        throw e
    }
}

const getCustomerDevices = async (email) => {
    try {
        let userId = await _getCustomerId(email)
        let userData = await axios({
            method: 'GET',
            url: `https://beta-api.customer.io/v1/api/customers/${userId}/attributes`,
            headers: {
                Authorization: `Bearer ${process.env.API_KEY_APP}`
            }
        })
        const { devices } = userData.data.customer
        if (devices.length < 1) throw `User ${email} don't have a device token`
        return devices
    } catch (e) {
        throw e
    }

}

module.exports = {
    addTokenDevice,
    deleteTokenDevice,
    getCustomerDevices
}