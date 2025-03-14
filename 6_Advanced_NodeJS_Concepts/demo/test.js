setTimeout(() => {
    console.log("SetTimeout");
})

setImmediate(() => {
    console.log("setImmediate");
})

Promise.resolve().then(() => {
    console.log("Promise then")
})

process.nextTick(() => {
    console.log("Process.nextTick");
});
