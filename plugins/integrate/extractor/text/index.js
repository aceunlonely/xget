
var check =()=>{}

var iRun = (result,extractor,options)=>{
    if(!result) return ''
    var rr =''
    if(extractor.regEx){
       var re =  new RegExp(extractor.regEx,"mg")
       var rs = result.match(re)
       if(rs){
           rr =rs
       }
    }

    return rr
}

exports.run= (result,extractor,options)=>{
    check()
    return iRun(result,extractor,options)
}


exports.example = {
    type:"text",
    regEx: "xxxxxx"
}


exports.exampleResult= "content"