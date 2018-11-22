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

var endWith=function(str,s){
    if(s==null||s==""||str.length==0||s.length>str.length)
       return false;
    if(str.substring(str.length-s.length)==s)
       return true;
    else
       return false;
   }

exports.endTrim=(str,end) =>{
   if(endWith(str,end)){
      return str.substring(0,str.length - end.length)
   }
   return str
}
var startWith=function(str,s){
    if(s==null||s==""|| str==null || str==""||str.length==0||s.length>str.length)
       return false;
    if(str.substr(0,s.length)==s)
       return true;
    else
       return false;
   }



exports.Type = Type
exports.endWith =endWith
exports.startWith = startWith


exports.indexOf = (str,searchStr) =>{
    if(!str || !searchStr){
        return -1
    }
    if(searchStr.length > 2 && endWith(searchStr,'/') && startWith(searchStr,'/')){
        //正则匹配
        var re =  new RegExp(searchStr.substring(1,searchStr.length-1),"mg")
        var arr;
        while ((arr = re.exec(str)) != null)
            return arr.index  //print(arr.index + "-" + arr.lastIndex + "\t" + arr);
        return -1
    }
    else{
        return str.indexOf(searchStr)
    }
}


