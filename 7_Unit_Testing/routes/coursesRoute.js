const express = require("express");
const {getAllCourse, createACourse, getACourse} = require("../controllers/coursesController");
const { isAuthorized } = require("../middlewares/auth");
const router = express.Router();

router.get("/", getAllCourse);
router.get("/:id", getACourse)
router.post("/", [isAuthorized], createACourse);

module.exports = router;
