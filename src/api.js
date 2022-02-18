const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

const initFirebase = require('./config/firebase')
const customerRouter = require('./routes/customer.routes')
const notificationsRouter = require('./routes/notification.routes') 

const app = express()

app.use(express.json())
app.use(morgan(('combined'), {
    stream: fs.createWriteStream(path.join(`${__dirname}/logs`, 'access.log'), { flags: 'a' })
}))

const PORT = process.env.PORT | 3000


app.use('/api', customerRouter)
app.use('/api/notifications',notificationsRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    initFirebase()
})