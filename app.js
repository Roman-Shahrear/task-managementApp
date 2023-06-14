const express = require('express')
const app = express()

require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const taskApp = require('./routes/task')


// middleware
app.use(express.json())


// routes
app.use('/api/v1',taskApp)
app.use(notFound)
app.use(errorHandlerMiddleware)



const port = process.env.PORT || 5000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening on port: ${port}...`))
    } catch (error) {
        console.log(error)
    }
}


start()
