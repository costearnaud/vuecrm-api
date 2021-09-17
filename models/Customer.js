const mongoose = require('mongoose')
const CollectionsModel = require('../models/Meta_Collection')

module.exports = {
  customerModel: async function customerModel () {
    const res = await CollectionsModel.findOne({ collectionName: 'Customers' })
    // console.log(res.fields)
    return mongoose.model('Customers', mongoose.Schema(res.fields, { timestamps: {} }))
  },
  customerFields: async function customerFields () {
    const res = await CollectionsModel.findOne({ collectionName: 'Customers' }, { fields: 1, _id: 0 })
    return res
  },
  defaultModel: mongoose.model('default', mongoose.Schema({}))
}
