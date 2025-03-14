


// --> MacroTaskQueue 

Promise.resolve().then(() => { //--> MicroTaskQueue
   console.log("Promise 1");
    Promise.resolve().then(() => {
        console.log("Promise 2");
    });
})

setTimeout(() => {
    console.log("Main Timer") 
}, 0)


// Call
console.log("Main script");

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

