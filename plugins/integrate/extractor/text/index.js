
var check =()=>{}


var iselect = ()=>{

}

var iRun = (result,extractor,options)=>{
    if(!result) return ''
    var rr =result
    if(extractor.regEx){
       var re =  new RegExp(extractor.regEx,"mg")
       var rs = result.match(re)
       if(rs){
           rr =rs
       }
    }
    if(extractor.select){
        //todo
    }
    return rr
}

exports.run= (result,extractor,options)=>{
    check()
    return iRun(result,extractor,options)
}


exports.example = {
    type:"text",
    regEx: "xxxxxx",
    select: [  //todo
        {
            key:["USD","/US[A]/"],
            value:"USD"
        },
        "CNY",
        "OTHER"
    ]
}


exports.exampleResult= "content"