
var util = require('./util')

var iGetRealPosition= (position)=>{
    if(!position) return {}
    /* tgt position
        {
            after:["/xxx/" , 1],
            before: ["/sc","abc",-2]
        }
         */
    var rp = {}
    //pre 
    if(util.Type.isArray(position)){
        var rp = {}
        //after
        if(position.length > 0){
            if(util.Type.isArray(position[0])){
                rp.after = position[0]
            }
            else{
                rp.after = [position[0]]
            }
        }
        if(position.length >1){
            if(util.Type.isArray(position[1])){
                rp.before = position[1]
            }
            else{
                rp.before = [position[1]]
            }
        }
    }
    else{
        if(position.after){
            if(util.Type.isArray(position.after))
                rp.after = position.after
            else
                rp.after = [position.after]
        }
        if(position.before){
            if(util.Type.isArray(position.before))
                rp.before= position.before
            else
                rp.before = [position.before]
        }
            
    }
    return rp
}

var iRun = (input,finder,options)=>{
    //input content
    if(!input) return ""
    var result = ""
    // position
    if(finder.position){
        //get real position
        var position = iGetRealPosition(finder.position)
        var sIndex = 0,eIndex =input.length -1
        if(position.after && position.after.length>0){
            position.after.forEach(a=>{
                var si = util.indexOf(input,a)// input.indexOf(a)
                if(si > sIndex && si> -1)
                    sIndex = si
            })
        }
        if(position.before && position.before.length>0){
            position.before.forEach(a=>{
                var ei = util.indexOf(input,a ) //input.indexOf(a)
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

exports.example2 = {
    type:"text",
    position:[0,-1]  //0到倒数-1行之间
}

exports.example2 = {
    type:"text",
    position:[[0,'/zb/','abc'],-1]  //0到倒数-1行之间
}

exports.example3 = {
    type:"text",
    position:{
        after: 0,
        before : '/asdf/'
    }
}

exports.output = ["content part",""]

//exports.input = "" 
// exports.outputs 
// exports.inputs
