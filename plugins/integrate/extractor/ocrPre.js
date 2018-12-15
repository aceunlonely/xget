var iRun = (result,extractor,options)=>{
    //trim empty lines 
    if(result)
        return result.replace(/\n[ ]{0,}\r?\n/g, '\r\n').replace(/^[ ]{0,}\r?\n/g, '').replace(/\r\n[ ]{1,}\r\n/g, '')
    return ''
}

exports.run= (result,extractor,options)=>{
   
    return iRun(result,extractor,options)
}


exports.example = {
    role:"extractor",
    type:"ocrPre"
}


exports.ouput= "content"
//exports.input = "" 
// exports.outputs 
// exports.inputs

exports.remark = ""