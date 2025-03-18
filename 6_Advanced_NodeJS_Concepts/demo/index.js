


// --> MacroTaskQueue 

// Promise.resolve().then(() => { //--> MicroTaskQueue
//    console.log("Promise 1");
//     Promise.resolve().then(() => {
//         console.log("Promise 2");
//     });
// })

// setTimeout(() => {
//     console.log("Main Timer") 
// }, 0)


// // Call
// console.log("Main script");

/*
Option 1
Main Script
Promise 1 
Promise 2
Main Timer

Option 2:
Main Script
Promise 1 
Main Timer
Promise 2

Option 3:
Promise 1
Main Script
Promise 2
Main Timer


*/
/*

// Basic v/s Bearer
// username and password are sent as base64 encoded string
// Not secure as if not over HTTPS, can be easily decoded
// Generally used for internal services

Bearer: uses token instead of credentials

// bcypt => async hashing
- Node JS handles it internally 
- passes to linuv worker threads
- offloads high cpu task from some libraries to worker threads like
- file hashing using crypto lib
- compression usng zlib
- image processing using sharp

*/


// setTimeout(function t1() { 
//     console.log("Timer 1");
//     Promise.resolve().then(function p1(){
//         console.log("Promise 1");
//     });
// },0);

// setTimeout(function t2() { 
//     console.log("Timer 2") 
// },0);


/* Macro task: 
t2

Micro task:
p1


Output: 
Timer 1
Promise 1
Timer 2
*/


/* Macro Task Queue
Event Loop:

F1

F2

F3
F4
F5
F6


process.nextTick()

*/

// setTimeout(() => {
//     console.log("SetTimeout");
// })

// setImmediate(() => {
//     console.log("setImmediate");
// })

// process.nextTick(() => {
//     console.log("Process.nextTick 1");
//     setTimeout(() => {
//         console.log("SetTimeout");
//     });

//     Promise.resolve().then(() => { 
//         console.log("Promise nested");
//     })
// });


// Promise.resolve().then(() => {
//     console.log("Promise then 1")
// })




// process.nextTick(() => {
//     console.log("Process.nextTick 2");
// });

// Promise.resolve().then(() => {
//     console.log("Promise then 2")
// });

// Callstack: [main]

// MicroTaskQueue: []
    // nextTickQueue: []
    // promises: []
// MacroTaskQueue: []





// queueMicrotask = {
//     nextTick: [],
//     promises: []
// }
// macroTaskQueue = []

// setImmediate(() => {
//     console.log("setImmediate");
// });

// setTimeout(() => {
//     console.log("SetTimeout");
// }, 0);

/* MacroTaskQueue
1. Timer Phase: setTimeout, setInterval
2. IO Phase: TCP errors, DNS errors, 
3. Idle/ prepare phase: Used by the event loop internally to manage its state
4. Poll Phase: FS, DB calls
5. Check Phase: setImmediate
6. Close Phase: close phase 
*/
// const fs = require('fs');

// fs.readFile("file.txt", () => {
//     setImmediate(() => {
//         console.log("setImmediate");
//     });
//     setTimeout(() => {
//         console.log("SetTimeout");
//     }, 0);
    
// })

// setImmediate(() => {
//     console.log("setImmediate inside I/O");
// });


// setTimeout(() => {
//     console.log("setTimeout inside I/O");
// })

// function recursiveNextTick() {
//     console.log("Recursive nextTick" + Math.random());
//     process.nextTick(recursiveNextTick);
// }


// recursiveNextTick();

// Promise.resolve().then(() => {
//     console.log("Promise then");
// })


// console.log("Main Script");




setTimeout(() => {
   console.log("Timer 1"); 
}, 0);

process.nextTick(() => {  
    console.log("Process.nextTick 1");
});

const start = Date.now();

while(Date.now() - start < 5000) {
    // Do nothing
    // Block the event loop for 5 second
}

process.nextTick(() => {  
    console.log("Process.nextTick 2");
});

console.log("Main Script");
/*
// Responses
Response 1: (Wait for 5 seconds)
Main Script
Process.nextTick 1
Process.nextTick 2
Timer 1


Response 2:
Main Script
Process.nextTick 1
Timer 1
Process.nextTick 2

Response 3
Main Script
*/