var xget = require('../index')


// get input
xget.get({
    input : {
        isLust:true,
        input:{
            type: "file",
            path:  [__dirname + "/data2/c-0.txt",__dirname + "/data2/c-1.txt",__dirname + "/data2/c-2.txt",__dirname + "/data2/c-3.txt",__dirname + "/data2/c-4.txt"],
            encode: "utf8",
            multi:false
        },
        filter:[
            {
                role: "extractor",
                type: "ocrPre"
            }
        ]
    }
}).then(raw=>{
    var options = { verbose : false}
    options.input = raw

    //get cooked
    xget.get({
        fapiaohao:{
            isLust:true
        },
        gongfangmingcheng:{},
        shouhuorenxinxi:{},
        yunshufangshi:{},
        kongyunri:{},
        maoyifangshi:{},
        dingdanhao:{},
        detals:{}
    },options).then(cooked =>{

    })
})
