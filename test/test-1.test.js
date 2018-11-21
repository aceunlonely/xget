
require('../config')
var engine = require('../engine')


var lust ={
    isLust: true,
    input:{
        type: "file",
        path:  __dirname + "/data/test-1.txt",
        encode: "utf8"
    },
    finder: {
        type:"text",
        position:{
            before:["DATE","PAGE"],
            after:["INVOICE"]
        }
    },
    extractor:{
        type:"text",
        regEx:"/E\\d{8}/"
    }
}

engine.run(lust,null).then(data => {
    console.log(data)
})

