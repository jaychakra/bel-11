const coursesModel = require("../models/coursesModel");

const getAllCourse = async () => {
    const courses = await coursesModel.find();
    return courses;
}

const getACourse = async (courseId) => {
    const id = req.params.id;
    const dbCourse = await coursesModel.findById(courseId);

    if (!dbCourse) {
        return -1;   
    }
    return dbCourse;
}

const createACourse =  async (course) => {
    const course =  req.body;
    const dbCourse = await coursesModel.create(course);
    res.send(dbCourse);
}

module.exports = {getAllCourse, getACourse, createACourse};