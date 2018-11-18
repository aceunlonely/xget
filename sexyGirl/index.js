



exports.prelude = function(options){
    // nothing here
}

/**
 * 判断字符串是否是Lust
 */
exports.isLustForString = (str,options) =>{
    return false
}

/**
 * 获取lust of String
 */
exports.getLustForString = function(str,options){
    return null
}

exports.isLustForObject = (obj,options) =>{
    return obj.isLust
}

exports.getLustForObject =(obj,options)=>{
    return obj
} 

exports.isLustForKV = (k,v,options)=>{
    return false //k === "???"
}

exports.getLustForKV = (k,v,options) => {
    return null
}


exports.beforeSatifyOneLust = (lustInfo,options)=>{
    //nothing here
}

exports.afterSatifyOneLust = (lustInfo,options) =>{}

exports.afterSatifyAllLust = (lustJson,options) =>{
    console.log(lustJson)
    return {
        isRemakeLustJson : false
    }
    
}

exports.getInputOneLustValue = (lustInfo,lastData,options) =>{

    //main logic here todo
    stdin.writeLine(lust.getPromptFromLustInfo(lustInfo,lastData))
    return stdin.readLine()
}

exports.validateOneLustInfo = (value,lustInfo,lastData,options) =>{
    return {
        isPass : true,
        value : value
    } 
}