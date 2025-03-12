require('dotenv').config()
const express = require("express");
const coursesRouter = require('./routes/courses');
const usersRouter = require('./routes/users');
const coursesRouterXML = require('./routes/coursesXML');
const app = express();

const mongoose = require('mongoose');


// app.use(express.json());
const PORT = process.env.PORT;
app.use("/v1/courses", coursesRouter);
app.use("/v1/users", usersRouter);
// app.use("/v2/courses", coursesRouterXML);

const C = () => {
    console.log("Execution Complete");
}


const B = () => {
    console.log("Entered A");
    C();
}

const A = () => {
    console.log("Entered A");
    B();
}

app.get("/", (req, res) => {
    console.log("Hello World!");
    console.log("Hello World!");
    console.log("Hello World!");
    console.log("Hello World!");
    A();
    res.send("Hello World!");  
})


mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB!");
    
    app.listen(PORT, () => {
        console.log("Server running on port:", PORT);
    }).on('error', (e) => console.log(e));    
});



/*
COURSE RATING APPLICTION
- View a single course
- View list of courses
- Create a course
- Change rating for a course

- get all courses
GET /v1/courses

- Get a single course
GET /v1/courses/:courseId

- Create a course
POST /v1/courses

- Update the rating of a course (Will depend on the data model)
PATCH /v1/courses/:courseId

body: 
{rating: Number}

*/
