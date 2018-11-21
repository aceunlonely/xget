var inputModule = require('peeriocjs').module("xget_input")
var finderModule = require('peeriocjs').module('xget_finder')
var extractorModule = require('peeriocjs').module('xget_extractor')

var config = require('peeriocjs').module("xget").invoke.sync.config()

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
 * inputHandler
 * @param {*} lust 
 * @param {*} options 
 */
var inputHandler = (lust,options)=>{
    //check lust structure
    checkLust(lust)

    //get input
    var inputString=""
    if(lust.input){
        //string
        if(util.Type.isString(lust.input)){
            inputString = lust.input
        }
        //method
        else if(util.Type.isObject(lust.input)){
            if(lust.input.isLust){
                //todo add a lust
            }
            else{
                //todo add params
                var type =lust.input.type || config.defaultInput
                var inputOrPromise = inputModule.invoke(type)[type](lust.input,options)
                if(inputOrPromise.then){
                    return new Promise((r,j)=>{
                        inputOrPromise.then(data=>{
                            r(finderHandler(lust,options,data))
                        })
                    })
                }
                else
                {
                    inputString = inputOrPromise
                }
            }
        }
        
    }
    else{
        inputString = options.input
    }
    return new Promise((r,j)=>{
        r(finderHandler(lust,options,inputString))
    })
}

var finderHandler=(lust,options,input)=>{
    var type = lust.finder.type || config.defaultFinder
    //todo add params
    var resultOrPromise = finderModule.invoke(type)[type](input,lust.finder,options)
    return new Promise((r,j)=>{
        if(resultOrPromise.then){
            resultOrPromise.then(data=>{
                r(extractorHandler(lust,options,data))
            })
        }else{
            r(extractorHandler(lust,options,resultOrPromise))
        }
    })
}

var extractorHandler=(lust,options,result)=>{
    var type = lust.extractor.type || config.defaultExtractor
    //todo add Params
    var resultOrPromise = extractorModule.invoke(type)[type](result,lust.extractor,options)
    return new Promise((r,j)=>{
        if(resultOrPromise.then){
            resultOrPromise.then(data=>{
                r(outputHandler(lust,options,data))
            })
        }
        else{
            r(outputHandler(lust,options,resultOrPromise))
        }
    })
}

var outputHandler=(lust,options,result)=>{
    return new Promise((r,j)=>{
        if(!lust.output)
            r(result)
        if(lust.output.isLust){
            //if output lust's input is null, fill it with result
            if(!lust.output.input){
                lust.output.input = result
            }
            r(inputHandler(lust.output,options))
        }
        else{
            throw Error("lust output must be a lust or nil")
        }
    })
}

var checkLust =(lust)=>{
    //todo
    // if(!lust.input)
    //     throw new Error("lust must have input")
    if(!lust.finder)
        throw new Error("lust need a finder : " + lust)
    if(!lust.extractor)
        throw new Error("lust need an extractor : " + lust)
}



exports.run = (lust,options)=>{
    return inputHandler(lust,options)
}