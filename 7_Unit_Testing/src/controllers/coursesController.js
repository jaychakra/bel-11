const coursesModel = require("../models/coursesModel");

const getAllCourse = async () => {
    const courses = await coursesModel.find();
    return courses;
}

const getACourse = async (courseId) => {
    const dbCourse = await coursesModel.findById(courseId);
    if (!dbCourse) throw new Error("Course not found");
    return dbCourse;
}

const createACourse =  async (course) => {
    const dbCourse = await coursesModel.create(course);
    return dbCourse;
}

module.exports = {getAllCourse, getACourse, createACourse};