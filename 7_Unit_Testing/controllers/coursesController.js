
const coursesModel = require("../models/coursesModel");


const getAllCourse = async (req, res) => {
    const courses = await coursesModel.find();
    res.send(courses);
}

const getACourse = async (req, res) => {
    const id = req.params.id;
    const dbCourse = await coursesModel.findById(id);

    if (!dbCourse) {
        return res.status(404).send("Course not found");   
    }
    return res.status(200).send(dbCourse);
}

const createACourse =  async (req, res) => {
    if (req.decodedToken.role != "admin"){
        return res.status(401).send({message: "Admin privilges required"});   
    }
    const course =  req.body;
    const dbCourse = await coursesModel.create(course);
    res.send(dbCourse);
}


module.exports = {getAllCourse, getACourse, createACourse};