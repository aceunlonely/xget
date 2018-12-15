var iRun = (result,extractor,options)=>{
    //trim empty lines 
    if(result)
        result =  result.replace(/\n[ ]{0,}\r?\n/g, '\r\n').replace(/^[ ]{0,}\r?\n$/g, '').replace(/\r/g,'')
    var array = new Array()
    result.split("\n").forEach(element => {
        array.push(element.trim(" "))
    });
    return array
}

exports.run= (result,extractor,options)=>{
   
    return iRun(result,extractor,options)
}


exports.example = {
    role:"extractor",
    type:"ocrSplit"
}


exports.ouput= ["abc","def"]
//exports.input = "" 
// exports.outputs 
// exports.inputs

exports.remark = "split your ocr raw "