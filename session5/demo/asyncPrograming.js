const asyncFunction1 =  () => {
   return new Promise((resolve, reject) => {   
        setTimeout(() => {
            console.log("Async 1");
            resolve("Response from Async 1")
        }, 1000);    
    })
}

const asyncFunction2 =  () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Aync 2");
            resolve("Response from Async 2");
        }, 3000);
    });    
}

const asyncFunction3 =  () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Async 3");
            reject("There was error executing this async function");
            // resolve("Response from Async 3");
        }, 1000);    
    })
}

// CallBack Hell
// asyncFunction1(() => {
//     asyncFunction2(() => {
//         asyncFunction3(() => {
//             step3();
//         })
//     })
// });





// const start = nowInSecs();
// const step3 =  () => {
//     console.log(nowInSecs() - start);
// }

// console.log("Starting at ", nowInSecs());

// asyncFunction1(() => {
//     asyncFunction2(() => {
//         asyncFunction3(() => {
//             step3();
//         })
//     })
// });


// asyncFunction1().then(() => {
//     asyncFunction2().then(() => {
//         asyncFunction3().then(step3);
//     })
// })

// asyncFunction1()
//     .then(asyncFunction3)
//     .then(asyncFunction2)
//     .then(step3)
//     .catch(e => console.log(e));

// const response = Promise.all([asyncFunction1(), asyncFunction2(), asyncFunction3(), step3()]);
// console.log("Response:", response);
// response.then(responses => {
//     console.log("All responses", responses);
// }).catch(err => console.log("Errror: ", err))
// .finally(() => {

// });

// async await
// "Syntactical Sugar" Over Promises 


// const asyncFunction1 =  () => {
//    return new Promise((resolve, reject) => {   
//         setTimeout(() => {
//             console.log("Async 1");
//             resolve("Response from Async 1")
//         }, 1000);    
//     })
// }

const nowInSecs = () => Date.now()/1000;

// const timeNow = nowInSecs()
//                 .then(res => console.log(res))
//                 .catch(e => console.log(e));

// let timeNowAsyncAwait;

// try {
//     timeNowAsyncAwait = await nowInSecs;
// } catch (e) {
//     console.log(e);
// }








// const fn2 = async () => {
//     console.log("Function 2 called");
//     await asyncFunction1();
// }

// fn2();

// console.log(timeNow);


// module1
// console.log()
// timeout --> 3 sec
// console.log()


// module2 
// console.log("Main start");
// import module1
// consoole.log("Main End");
// await asyncFunction1();

// console.log(nowInSecs());
// try {
//     const res1 = await asyncFunction1();
//     const res2 = await asyncFunction2();
//     const res3 = await asyncFunction3();
// } catch(e) {
//     console.log(e);
// }
// console.log(nowInSecs());


// const responses  =  await Promise.allSettled([asyncFunction1(), asyncFunction2(), asyncFunction3()])



const responses  =   await Promise.race([asyncFunction1(), asyncFunction2(), asyncFunction3()])
// Promise.race([])
console.log(responses);


// Scenarios where you don't need async await?














