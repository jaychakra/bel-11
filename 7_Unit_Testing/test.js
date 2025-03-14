const express = require("express");
const app = express();
const PORT = 3000

app.get("/", (req, res) => {
    console.log("Hello World!");
    res.send("Hello World!");  
})


app.listen(() => {
    console.log("Server running on port:", PORT);
}, PORT).on('error', (e) => console.log(e));

