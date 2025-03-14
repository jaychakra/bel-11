const express = require("express");
const router = express.Router();
router.use(express.json());
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const coursesModel = require("../models/coursesModel");


const authorizationMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).send({message: "Token is required"});
    }

    let decodedToken; 
   
    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (e) {
        return res.status(401).send({message: "Invalid Token"});
    }
    
    req.decodedToken = decodedToken;
    next();
}

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
    if (req.decodedToken.role != "admin"){
        return res.status(401).send({message: "Admin privilges required"});   
    }
    const course =  req.body;
    const dbCourse = await coursesModel.create(course);
    res.send(dbCourse);
}

router.get("/", getAllCourseHandler);
router.get("/:id", getACourseHandler)
router.post("/", [authorizationMiddleware], createACourseHandler);

module.exports = router;
