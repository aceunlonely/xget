var inputModule = require('peeriocjs').module("xget_input")
var finderModule = require('peeriocjs').module('xget_finder')
var extractorModule = require('peeriocjs').module('xget_extractor')

var config = require('peeriocjs').module("xget").invoke.sync.config()

var util = require('./util')

//plusgins
const plugins = require('./plugins.js')

var getPrintString = content=>{
    if(util.Type.isObject(content)){
        return JSON.stringify(content)
    }else{
        return content
    }
}

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
 * inputHandler 输入处理
 * @param {*} lust 
 * @param {*} options 
 */
var inputHandler = (lust,options)=>{
    if(options.config.verbose){
        console.log('xget-engine: inputHandle 输入：=======================================================================')
        console.log('lust: '+ getPrintString(lust)  + "\\r\\n options: " + getPrintString(options) )
    }
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
                var type =lust.input.type || config.defaultInput
                var inputOrPromise = inputModule.invoke(type)[type](lust.input,options)
                if(inputOrPromise.then){
                    return new Promise((r,j)=>{
                        inputOrPromise.then(data=>{
                            r(filterHandler(lust,options,data))
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
        r(filterHandler(lust,options,inputString))
    })
}

var filterHandler=(lust,options,input)=>{
    /*
        filter: {
            role: "finder"
            type:"default"
            ...
        },
    */
    //获取filters
    var filters = new Array()
    if(lust.filter){
        //判断是否是数组
        if(util.Type.isArray(lust.filter)){
            filters = lust.filter
        }
        else{
            filters.push(lust.filter)
        }
        //todo check structure
    }
    else{
        if(!lust.finder){
            throw Error('xget-filterHandler: must contains finder  or filter')
        }
        if(!lust.extractor){
            throw Error('xget-filterHandler: must contains extractor or filter')
        }
        lust.finder.role = lust.finder.role || "finder"
        lust.extractor.role = lust.extractor.role  || "extractor"
        filters.push(lust.finder)
        filters.push(lust.extractor)
    }
    var firstF = null
    /*
    next:
    {
        filter: {},
        thisIndex : 0,
        handler: (x,options,input)=>{}
    }
    
    */
    filters.forEach((f,index)=>{
        //find next filter
        var nextF = index + 1 >= filters.length ? null : filters[index + 1]
        if(nextF){
            f.next = {
                filter:nextF,
                thisIndex : index,
                handler : util.startWith(nextF.role,"f") ? finderHandler : extractorHandler
            }
        }
        else{
            f.next={
                filter:lust,
                thisIndex : index,
                handler : outputHandler
            }
        }
        if(index==0){
            firstF = f
        }
    })
    if(firstF){
        return new Promise((r,j)=>{
            var thisHandler = util.startWith(firstF.role,"f") ? finderHandler : extractorHandler
            r(thisHandler(firstF,options,input))
        })
    }else{
        throw Error('xget:engine lust need at least one filter')
    }
}

/**
 * 发现器处理
 * @param {*} finder 
 * @param {*} options 
 * @param {*} input 
 */
var finderHandler=(finder,options,input)=>{
    if(options.config.verbose){
        console.log('xget-engine: filter['+ finder.next.thisIndex +'] finderHandler 输入：=======================================================================')
        console.log(' input: '+ getPrintString(input) )
    }
    //todo add guess input type
    var type = finder.type || config.defaultFinder
    var resultOrPromise = finderModule.invoke(type)[type](input,finder,options)
    return new Promise((r,j)=>{
        if(resultOrPromise.then){
            resultOrPromise.then(data=>{
                r(finder.next.handler(finder.next.filter,options,data))
            })
        }else{
            r(finder.next.handler(finder.next.filter,options,resultOrPromise))
        }
    })
}

/**
 * 提取处理器
 * @param {*} extractor 
 * @param {*} options 
 * @param {*} result 
 */
var extractorHandler=(extractor,options,result,nextFn)=>{
    if(options.config.verbose){
        console.log('xget-engine: filter['+ extractor.next.thisIndex +'] extractorHandler 输入：=======================================================================')
        console.log('result: '+ getPrintString(result) )
    }
    //todo add guess input type
    var type = extractor.type || config.defaultExtractor
    var resultOrPromise = extractorModule.invoke(type)[type](result,extractor,options)
    return new Promise((r,j)=>{
        if(resultOrPromise.then){
            resultOrPromise.then(data=>{
                r(extractor.next.handler(extractor.next.filter,options,data))
            })
        }
        else{
            r(extractor.next.handler(extractor.next.filter,options,resultOrPromise))
        }
    })
}

/**
 * 输出处理器
 * @param {*} lust 
 * @param {*} options 
 * @param {*} result 
 */
var outputHandler=(lust,options,result)=>{
    if(options.config.verbose){
        console.log('xget-engine: outputHandler 输入：=======================================================================')
        console.log('result: '+ getPrintString(result) )
    }
    //todo add guess result type
    return new Promise((r,j)=>{
        if(!lust.output){
            r(result)
            return
        }
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

    // if(!lust.finder)
    //     throw new Error("lust need a finder : " + lust)
    // if(!lust.extractor)
    //     throw new Error("lust need an extractor : " + lust)
}



exports.run = (lust,options)=>{
    options = options || {}
    options.config = options.config || config
    //console.log(getPrintString(options))
    return inputHandler(lust,options)
}