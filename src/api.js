const express = require('express')
const serverless = require('serverless-http')

const app = express()
const mongoose = require('mongoose')
const uri = 'mongodb+srv://mongodb_admin:e0wl8BtEQ50Uzcnu@dreamcluster.lt12i.mongodb.net/DreamDb?retryWrites=true&w=majority'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log('MongoDb connected with mongoose')
    else console.log('MongoDb NOT connected, error : ' + err)
  }
)

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
const port = process.env.PORT || 3000

app.use('/.netlify/functions/api/customers', customersRoutes)
app.use('/.netlify/functions/api/collections', collectionsRoutes)

app.listen(port, () => console.log(`Server listening on port ${port}`))

module.exports.handler = serverless(app)
