
require('../config')
var engine = require('../engine')

//no
var lustNo ={
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
        regEx:"H\\d{8}"
    }
}

//

engine.run(lustNo,null).then(data => {
    console.log(data)
})

