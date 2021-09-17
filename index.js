const express = require('express')
const app = express()
require('./models/database')

const customersRoutes = require('./routes/customersController')
const collectionsRoutes = require('./routes/collectionsController')
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

app.use('/customers', customersRoutes)
app.use('/collections', collectionsRoutes)
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server listening on port ${port}`))
