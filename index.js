const mongoose = require('mongoose')
require('dotenv').config()
// const uri = 'mongodb+srv://mongodb_admin:e0wl8BtEQ50Uzcnu@dreamcluster.lt12i.mongodb.net/DreamDb?retryWrites=true&w=majority'

// This will make mongoose not pluralize collection names at all, so mongoose.model('User', schema)
// will store documents in the 'User' collection.
mongoose.pluralize(null)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log('MongoDb connected with mongoose')
    else console.log('MongoDb NOT connected, error : ' + err)
  }
)

const express = require('express')
const app = express()
const cors = require('cors')

// Middleware bodyParser.json() devient express.json() depuis 2021
app.use(express.json())
app.use(cors())

const customersRoutes = require('./routes/customersController')
const collectionsRoutes = require('./routes/collectionsController')
// app.use('/.netlify/functions/api/customers', customersRoutes)
app.use('/customers', customersRoutes)
app.use('/collections', collectionsRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server listening on port ${port}`))
