const lustJson = require('lustJson')
const sxg = require('./sexyGirl')

exports.get = (json,options) =>{
    return lustJson.get(json,sxg,{})
}