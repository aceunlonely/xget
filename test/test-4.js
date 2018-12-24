
var xget = require('../index')
var fs = require('fs')

var raw = fs.readFileSync(__dirname + "/data2/raw.txt",'utf8')

 var options = { input : raw}
 //console.log(raw)
 xget.get({
     taskId : 'xxx',
     raw : raw,
     lines : {
         isLust : true,
         filter:[
             {
                 role: "extractor",
                 type:"ocrSplit"
             }
         ]
     }
 },options).then(data=>{
     console.log(data)
    //  dao.rmResult(task._id).then(()=>{
    //      dao.addResult(data)
    //      // updateStatus
    //      dao.setTaskStatus(task,2,3)
    //      r()
    //  },j)
 })