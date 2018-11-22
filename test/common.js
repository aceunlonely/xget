

console.log('abc'.match(/a/g))


var str = 'hello good day o  g , oxg,o\tg'
var searchStr = '/o\\s{1,3}g/'

//console.log(str.match(/o\s{1,3}g/g))
//正则匹配
var re =  new RegExp(searchStr.substring(1,searchStr.length-1),"mg")
var arr;
while ((arr = re.exec(str)) != null)
    console.log(arr.index + "-" + arr.lastIndex + "\t" + arr);
