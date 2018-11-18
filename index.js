const lustJson = require('lustJson')
const sxg = require('./sexyGirl')

exports.get = (json) =>{
    return lustJson.get(json,sxg,{})
}