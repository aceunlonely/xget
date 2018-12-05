// var promise1 = new Promise((r,j)=>{
//     setTimeout(()=>{console.log("p1 finished"),r(null)}, 4000)
// })
// var promise2 = new Promise((r,j)=>{
//     setTimeout(()=>{console.log("p2 finished"),r("result 2")}, 3000)
// })
// var promise3 =new Promise((r,j)=>{
//     setTimeout(()=>{console.log("p3 finished"),r(null)}, 2000)
// })

// Promise.all([promise1, promise2, promise3]).then(function(values) {
//     console.log("here is all");
//     console.log(values);
// });

//package

var promiseAll =  (arr,fn,completeFn)=>{
    var pArray = new Array()
    arr.forEach(element => {
        pArray.push(fn(element))
    });
    Promise.all(pArray).then(values=>{
        completeFn(values)
    })
}

promiseAll([1,2,3,4],data=>{
    return new Promise((r,j)=>{
        setTimeout(()=>{console.log( data + " finished"),r(data)}, 1000* (5-data))
    })
},values=>{
    console.log("result :" + values)
})


