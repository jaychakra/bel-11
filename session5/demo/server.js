const express = require("express");

const app = express();
const PORT = 8081;

const wait = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 10000);
    });
}

app.get("/", async (req, res) => {
    console.log("Received request: ", req.path, " at secs: ", Math.round(Date.now()/1000)%100);
    const response =  await wait();
    res.send("Response after 10 seconds delay. ", "at secs: ", Math.round(Date.now()/1000)%100);
    
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});