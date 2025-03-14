require('dotenv').config()
const express = require("express");
const coursesRouter = require('./routes/coursesRoute');
const usersRouter = require('./routes/usersRoute');
const app = express();

const mongoose = require('mongoose');

app.use(express.json());
const PORT = process.env.PORT;
app.use("/v1/courses", coursesRouter);
app.use("/v1/users", usersRouter);

app.get("/", (req, res) => res.send("Simple course rating service"))

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB!");
    
    app.listen(PORT, () => {
        console.log("Server running on port:", PORT);
    }).on('error', (e) => console.log(e));    
});
