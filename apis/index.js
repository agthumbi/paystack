var authenticate = require('./auth')
var cartapi = require('./cart')
var productsapi = require('./products')





var extend = require('util')._extend
var iapi = {}
iapi.index = (req, res) => {
  res.send('Welcome to PayStack api');
}
iapi.status = (req, res) => {
  res.send('0');
}

var api = extend(iapi, authenticate)
api = extend(api, cartapi)
api = extend(api, productsapi)





module.exports = api
