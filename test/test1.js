
var engine = require('../engine')


var lust ={
    isLust: true,
    input:{
        type: "file",
        path:  __dirname + "packs/1.txt"
    },
    finder: {
        type:"default"

    },
    extractor:{
        type:"default"

    },
    output:{
        input:null,
        finder:{
            type:"default"

        },
        extractor:{
            type:"default"

        },
        output:null
    }
}

engine.run(lust,null).then(data => {console.log(data)})