const util = require('./util')

var check =()=>{}


var iGetRealSelect =sel=>{
    /*
    [  //todo
        {
            key:["USD","/US[A]/"],
            value:"USD"
        },
        "CNY",
        "OTHER",
        ["test","test"],
        [["test","/test[a]/"],"abc"]
    ]
    */
    if(util.Type.isString(sel)){
        var s= new Array()
        //"U,SD#CNY"
        //"USD,CNY"
        if(sel.indexOf("#")){
            s =  sel.split("#")
        }else if(sel.indexOf(',')){
            s = sel.split(',')
        }else{
            s.push(sel)
        }
        sel =s 
    }
    if(!util.Type.isArray(sel)){
        throw Error("xget:plugin:e:text:iGetRealSelect:  select must be a string type or Array")
    }
    var realSel = new Array()
    sel.array.forEach(element => {
        //"CNY"
        if(util.Type.isString(element)){
            realSel.push({
                key : [element],
                value : element
            })
        }
        /*{
            key:["USD","/US[A]/"],
            value:"USD"
        }*/
        else if(util.Type.isObject(element)){

        }
        //["test","test"]
        //[["test","/test[a]/"],"abc"]
        else if(util.Type.isArray(element)){

        }
        else{
            throw Error('xget:plugin:e:text:iGetRealSelect : element of sel not right :' + element)
        }
    });
}


var iselect = (result,select)=>{
    //get real select 
    var realSelect = iGetRealSelect(select)
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
        rr = iselect(rr,extractor.select)
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
        "OTHER",
        ["test","test"],
        [["test","/test[a]/"],"abc"]
    ]
}

exports.example1 = {
    type:"text",
    regEx: "xxxxxx",
    select: "USD,CNY"
}

exports.example1 = {
    type:"text",
    regEx: "xxxxxx",
    select: "U,SD#CNY"
}



exports.exampleResult= "content"