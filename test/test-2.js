
require('../config')
var engine = require('../engine')

//no
var lustNo ={
    isLust: true,
    input:{
        type: "file",
        path:  __dirname + "/data/test-1.txt",
        encode: "utf8",
        multi:false
    },
    finder: {
        type:"text",
        position:{
            after:["INVOICE"],
            before:["DATE","PAGE"]
        },
        multi:false
    },
    extractor:{
        type:"text",
        regEx:"H\\d{8}"
    }
}


//test multi
engine.run(lustNo,null).then(data => {
    console.log("test multi +=================================")
    console.log(data)
})

// test input file read multi files

var lustfile ={
    isLust: true,
    input:{
        type: "file",
        path:  [__dirname + "/data/c1.txt",__dirname + "/data/c2.txt"],
        encode: "utf8",
        multi:false
    },
    filter:[
        {
            role: "extractor",
            type:"ocrPre"
        }
    ]
}

engine.run(lustfile,null).then(data=>{
    console.log("test input file read multi files +=================================")
    console.log(data)
})