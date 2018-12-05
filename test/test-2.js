
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


//no
engine.run(lustNo,null).then(data => {
    console.log(data)
})


//addr
var lustAddr ={
    isLust: true,
    input:{
        type: "file",
        path:  __dirname + "/data/test-1.txt",
        encode: "utf8"
    },
    finder: {
        type:"text",
        position:{
            after:["/SHIP\\s{1,3}TO/"],
            before:["SHIPPED","/ON\\W{1,3}ABOUT/"]
        }
    },
    extractor:{
        type:"text"
        //regEx:"H\\d{8}"
    }
}

//addr
// engine.run(lustAddr,{ config: {verbose:false}}).then(data => {
//     console.log(data)
// })


//USD
var lustUSD ={
    isLust: true,
    input:{
        type: "file",
        path:  __dirname + "/data/test-1.txt",
        encode: "utf8"
    },
    filter:[
        {
            role: "extractor",
            type:"ocrPre"
        },
        {
            role: "finder",
            type:"text",
            position:{
                after:["/DEKESCRIPTIOHMN[ ]{1,}QUANYZITY[ ]{1,}UNIT[ ]{1,}PRICE[ ]{1,}AMOUNT/"]
            }
        },
        {
            role: "finder",
            type:"text",
            position:[0,2]
        },
        {
            role:"e",
            type:"text",
            select: [  //add
                {
                    key:["USD","/US[A]/"],
                    value:"USD"
                },
                "CNY",
                "OTHER"
            ]
        }

    ]
}

// engine.run(lustUSD,{ config: {verbose:false}}).then(data => {
//     console.log(data)
// })