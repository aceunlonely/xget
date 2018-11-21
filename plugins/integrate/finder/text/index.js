

var iRun = (input,finder,options)=>{
    //input content
    if(!input) return ""
    var result = ""
    // position
    if(finder.position){
        var sIndex = 0,eIndex =input.length -1
        if(finder.position.after && finder.position.after.length>0){
            finder.position.after.forEach(a=>{
                var si = input.indexOf(a)
                if(si > sIndex && si> -1)
                    sIndex = si
            })
        }
        if(finder.position.before && finder.position.before.length>0){
            finder.position.before.forEach(a=>{
                var ei = input.indexOf(a)
                if(ei > -1 && ei< eIndex){
                    eIndex = ei
                }
            })
        }
        if(eIndex> sIndex){
            result = input.substring(sIndex,eIndex)
        }
    }

    return result
}

var check = ()=>{}

exports.run= (input,finder,options)=>{
    check()
    //input content
    return iRun(input,finder,options)
}


exports.example = {
    type:"text",
    position:{
        before:["DATE","PAGE"],
        after:["INVOICE"]
    }
}

exports.exampleResult = ["content part",""]