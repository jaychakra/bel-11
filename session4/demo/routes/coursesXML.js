const express = require("express");
const router = express.Router();

const courses = [
    {
        id: 0,
        name: "Backend Engineering using NodeJS",
        rating: 4.5,
        difficulty: "Begineer",
        price: "20000"
    },
    {
        id: 1,
        name: "Introduction to React",
        rating: 4.0,
        difficulty: "Begineer",
        price: "50000"
    },
    {
        id: 2,
        name: "Practices in Project Management",
        rating: 4.0,
        difficulty: "Advance",
        price: "30000"
    }
];


router.get("/", (req, res) => {
    res.send(courses);
})


router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.send(courses[id]);
})

const logger2 = (req, res, next) => {
    req['custom']="Dinesh says hello";
    console.log("Logger2 is called");
    next();
}

router.post("/", [logger2], (req, res, next) => {
    const course =  req.body;
    course['id'] = courses.length;
    console.log(course);
    courses.push(course);    
    res.send(course);
});

module.exports = router;
