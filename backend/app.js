const express = require('express')
require('dotenv').config()

const services = require('./routes/services_routes')
const meals = require('./routes/canteen_routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/services', services)
app.use('/meals', meals)

const PORT = process.env.PORT || 7000
app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}...`)
})  