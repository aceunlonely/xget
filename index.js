const lustJson = require('lustjson.js')
const sxg = require('./sexyGirl')
require('./config')

exports.get = (json,options) =>{
    //console.log(json)
    return lustJson.get(json,sxg,options)
}