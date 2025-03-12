const express = require("express");
const router = express.Router();
router.use(express.json());

const coursesModel = require("../models/coursesModel");


const logger2 = (req, res, next) => {
    req['custom']="Dinesh says hello";
    console.log("Logger2 is called");
    next();
}


const getAllCourseHandler = async (req, res) => {
    const courses = await coursesModel.find();
    res.send(courses);
}

const getACourseHandler = async (req, res) => {
    const id = req.params.id;
    const dbCourse = await coursesModel.findById(id);

    if (!dbCourse) {
        return res.status(404).send("Course not found");   
    }
    return res.status(200).send(dbCourse);
}

const createACourseHandler =  async (req, res) => {
    const course =  req.body;
    const dbCourse = await coursesModel.create(course);
    res.send(dbCourse);
}

router.get("/", getAllCourseHandler);
router.get("/:id", getACourseHandler)
router.post("/", [logger2], createACourseHandler);

module.exports = router;
