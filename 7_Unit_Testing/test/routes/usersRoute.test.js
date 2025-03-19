const request = require("supertest");
const express = require("express");
const router = require("../../src/routes/usersRoute"); // Your user routes

const usersController = require("../../src/controllers/usersController"); // Your controller functions
jest.mock("../../src/controllers/usersController");

const app = express();
app.use(express.json());
app.use(router); // Mount routes on app

describe("User Authentication Routes", () => {

    describe("POST /register", () => {

        it('should successfully register a user', async () => {
            const user = {
                name: "John Doe",
                email: "john@example.com",
                password: "password123",
                role: "user"
            };

            // Mock the registerUser function to return the user object 
            usersController.registerUser.mockResolvedValue(user);

            const response = await request(app)
                .post('/register')
                .send(user)
                .expect(200);

            expect(response.body).toEqual(user);
            // expect(registerUser).toHaveBeenCalledWith(user);
        });


        // it('should fail for missing fields', async () => {
        //     const user = {};

        //     usersController.registerUser =  jest.fn().mockImplementation ((u) => {
        //         if (u.password ) {
        //             return Promise.resolve(u);
        //         } else {
        //             return Promise.reject("Pasword field is required");
        //         }
        //      })
        //     const response = await request(app)
        //         .post('/register')
        //         .send(user)
        //         .expect(200);

        //     // expect(response.body).toEqual(user);
        //     expect(registerUser).toHaveBeenCalledWith(user);
        // });
    });
})




