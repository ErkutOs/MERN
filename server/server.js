import express from 'express'
import cors from 'cors'
const morgan = require('morgan')
require('dotenv').config()

//server
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use((req, res, next) => {
    console.log("middleware")
    next()
})

//route
app.get('/', (req, res) => {
    res.send('you hit the server endpoint')
})

//port
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})


