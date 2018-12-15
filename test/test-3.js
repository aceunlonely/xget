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
},{verbose:false}).then(raw=>{
    var options = { verbose : false}
    options.input = raw.input
   // console.log(raw)
    //console.log(options)
    //get cooked
    // xget.get({
    //     fapiaohao:{
    //         isLust:true
    //     },
    //     gongfangmingcheng:{},
    //     shouhuorenxinxi:{},
    //     yunshufangshi:{},
    //     kongyunri:{},
    //     maoyifangshi:{},
    //     dingdanhao:{},
    //     detals:{}
    // },options).then(cooked =>{

    // })
    //console.log(options)
    xget.get({
        all : {
            isLust:true,
            filter:[
                {
                    role: "extractor",
                    type:"ocrSplit"
                }
            ]
        }
    },options).then(data=>{
        //console.log(data)

        console.log(data.all)
    })
})
