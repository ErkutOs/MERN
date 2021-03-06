import express from 'express'
import cors from 'cors'
import { readdirSync } from 'fs'
import mongoose from 'mongoose'
const morgan = require('morgan')
require('dotenv').config()

//server
const app = express()

//database
mongoose
  .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))


//route
readdirSync('./routes').map((route) => {
    app.use('/api', require(`./routes/${route}`))
})

//port
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})


