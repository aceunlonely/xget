# xget
x get

## build
[![Build Status](https://api.travis-ci.org/repos/aceunlonely/xget.svg)](https://www.travis-ci.org/aceunlonely/xget)

## summary
1. support customize plugins , easy extend
2. support recurse get lustJson
3. input and filter support multi or branch
4. support filter  guess input /output type   // todo
5. maybe input.file can support Glob  //uncomfirn

## main desgin
    details @ docs/

## how to use
```shell
npm i --save xget.js
```

```js
var xget = require('xget.js')

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

```