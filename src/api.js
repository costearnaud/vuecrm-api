const express = require('express')
const serverless = require('serverless-http')

const app = express()
require('../models/database')
/*
const customersRoutes = require('../routes/customersController')
const collectionsRoutes = require('../routes/collectionsController')
app.use('/customers', customersRoutes)
app.use('/collections', collectionsRoutes)
*/
const cors = require('cors')
const mongoose = require('mongoose')

// This will make mongoose not pluralize collection names at all, so mongoose.model('User', schema)
// will store documents in the 'User' collection.
mongoose.pluralize(null)

// Enable Use and Modify at the same time
// Mongoose v6 returns : invalid option ???
// mongoose.set('useFindAndModify', false)

// Middleware bodyParser.json() devient express.json() depuis 2021
app.use(express.json())
app.use(cors())

const customersRoutes = require('../routes/customersController')
const collectionsRoutes = require('../routes/collectionsController')
app.use('/.netlify/functions/api/customers', customersRoutes)
app.use('/.netlify/functions/api/collections', collectionsRoutes)

module.exports.handler = serverless(app)
/*
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server listening on port ${port}`))
*/