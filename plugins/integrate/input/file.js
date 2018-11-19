
var fs = require('fs')

var check =(input)=>{
    if(!input.path)
        throw Error("plugins input file: input path needed" + input )
}

/*
{
    "type":"file",
    "path" : "d:/abc.txt",
    "encoding" : "uft8"
}
*/

exports.run=(input,options)=>{
    check(input)
    return fs.readFileSync(input.path, { encoding : ( input.encoding || "utf8")});
}