var iRun = (result,extractor,options)=>{
    //trim empty lines 
    if(result)
        return result.replace(/\n[ ]{0,}\r?\n/g, '\r\n').replace(/^[ ]{0,}\r?\n/g, '')
    return ''
}

exports.run= (result,extractor,options)=>{
   
    return iRun(result,extractor,options)
}


exports.example = {
    role:"extractor",
    type:"ocrPre"
}


exports.exampleResult= "content"

exports.remark = ""