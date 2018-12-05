
var fs = require('fs')
var Type = (function() {
    var type = {};
    var typeArr = ['String', 'Object', 'Number', 'Array','Undefined', 'Function', 'Null', 'Symbol','Boolean','RegExp'];
    for (var i = 0; i < typeArr.length; i++) {
        (function(name) {
            type['is' + name] = function(obj) {
                return Object.prototype.toString.call(obj) == '[object ' + name + ']';
            }
        })(typeArr[i]);
    }
    return type;
 })();

var check =(input)=>{
    if(!input.path)
        throw Error("plugins input file: input path needed" + input )
}

/*
{
    "type":"file",
    "path" : "d:/abc.txt",
    "encoding" : "utf8"
}
*/

exports.run=(input,options)=>{
    check(input)
    if(Type.isArray(input.path))
    {
        var content=""
        input.path.forEach(element => {
            content +=fs.readFileSync(element, { encoding : ( input.encoding || "utf8")});
        });
        return content
    }
    else
        return fs.readFileSync(input.path, { encoding : ( input.encoding || "utf8")});
}

exports.example = {
    type: "file",
    path : "d:/abc.txt",
    encoding : "utf8(默认值utf8)"
}

exports.output = "content"
//exports.input = "" 
// exports.outputs 
// exports.inputs
