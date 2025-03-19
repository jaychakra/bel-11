const coursesController = require('../../src/controllers/coursesController');
const coursesModel = require('../../src/models/coursesModel');

jest.mock('../../src/models/coursesModel');


// Want to test empty courses
// Successfully fetching the list
// Failures in DB Call / Service Call
// 
describe('Test getAllCourse', () => { 
    test("It should find all courses", async () => {   
        const mockCourses = [{_id: 1, name: "course1"}, {_id: 1, name: "course1"}];
        const mockResponseCourses = [...mockCourses];
        coursesModel.find.mockResolvedValue(mockCourses);    
        
        const result = await coursesController.getAllCourse();

        expect(result[0]._id).toBe(1);
        expect(result[0].name).toBe("course1");
        
        expect(result).toEqual(mockResponseCourses);
        expect(coursesModel.find).toHaveBeenCalledTimes(1);

    });

    



});

describe("Test getAcourse", () => {
    test("It should succesfully get a course by id", async () => {
        const mockCourse = {_id: 1, name: "course1"};

        coursesModel.findById = jest.fn().mockImplementation ((id) => {
           return Promise.resolve(id === 1 ? mockCourse : null);
        })
    
        const result = await coursesController.getACourse(1);

        expect(coursesModel.findById).toHaveBeenCalledTimes(1);
        expect(coursesModel.findById).toHaveBeenCalledWith(1);

        expect(result).toEqual(mockCourse);

    });

    test("It should throw an error when course doesn't exist", async () => {
        const mockCourse = {_id: 1, name: "course1"};

        coursesModel.findById = jest.fn().mockImplementation ((id) => {
           return Promise.resolve(id === 1 ? mockCourse : null);
        })
        
        await expect(coursesController.getACourse(2)).rejects.toThrow("Course not found");

    });

})

describe("Test createACourse", () => {
    test("It should error out if there are db issues", async () => {
        const mockCourse = {_id: 1, name: "course1"};

        coursesModel.create = jest.fn().mockImplementation ((course) => {
           return Promise.reject(new Error('DB Error'));
        });

        await expect(coursesController.createACourse(mockCourse)).rejects.toThrow("DB Error");
        
    });
})







