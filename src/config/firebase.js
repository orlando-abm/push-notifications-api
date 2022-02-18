const firebaseAdmin = require('firebase-admin')

const initFirebase = () => {
    try {
        const serviceAccount = require(__dirname + '/firebase.json')
        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount)
        })
        console.log('INITFIREBASE')
    } catch (e) {
        console.log(`INITFIREBASE ERROR ${e}`)
    }
}

module.exports = initFirebase