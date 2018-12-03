var text = require('./index')



var print = json =>{ 
    console.log('+++++++++++++++++++++++++++++++++++++++++++++')
    console.log(JSON.stringify(json))
    console.log('------------------------------------')
    var j = text.iGetRealSelect(json)
    console.log(JSON.stringify(j))
}


print(text.example.select)

print(text.example1.select)

print(text.example2.select)

