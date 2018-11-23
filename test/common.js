

console.log('abc'.match(/a/g))


var str = 'hello good day o  g , oxg,o\tg'
var searchStr = '/o\\s{1,3}g/'

//console.log(str.match(/o\s{1,3}g/g))
//正则匹配
var re =  new RegExp(searchStr.substring(1,searchStr.length-1),"mg")
var arr;
while ((arr = re.exec(str)) != null)
    console.log(arr.index + "-" + arr.lastIndex + "\t" + arr);



console.log('\n\nhello good day o \n  g , oxg,o\tg \n\n \r\n  sdf \n\n'.replace(/\n[ ]{0,}\r?\n/g, '\r\n').replace(/^[ ]{0,}\r?\n/g, ''))

console.log('++++++++++++++++++++++++++++++++++++++++++++++++++')
str = 'abc\r\n ccc\r\n dddd\r\n bac \r\n acd'
re = new RegExp(/\n/,"mg")
while ((arr = re.exec(str)) != null)
    console.log(arr.index + "-" + arr.lastIndex + "\t" + arr);