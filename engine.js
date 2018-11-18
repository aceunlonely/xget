var inputModule = require('peeriocjs').module("xget_input")
var finderModule = require('peeriocjs').module('xget_finder')
var extractorModule = require('peeriocjs').module('xget_extractor')

var util = require('./util')

//plusgins
const plugins = require('./plugins.js')


//main
/* lust shall be
{
    input:" name,age | lily,13 | lucy, 15  | site http://apporoad.com",
    finder: {
        type:"default"
        ...
    },
    extractor:{
        type:"default"
        ...
    },
    output:null
}
*/
/**
 * main logic
 * @param {*} lust 
 * @param {*} options 
 */
var run = (lust,options)=>{
    //check lust structure
    checkLust(lust)

    //
}

var checkLust =(lust)=>{
    //todo
}
