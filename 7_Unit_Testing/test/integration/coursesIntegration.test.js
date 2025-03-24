const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config({path: './.testenv'});

const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app'); 
const Course = require('../../src/models/coursesModel');
const jwt = require('jsonwebtoken');

let mongoServer;
let adminToken, userToken;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    // Create admin and user
    const adminUser = { name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin' };
    const normalUser = { name: 'Normal User', email: 'user@example.com', password: 'password123', role: 'user' };

    //Register and login to get tokens
    await request(app)
        .post('/v1/users/register')
        .send(adminUser);
    
    await request(app)
        .post('/v1/users/register')
        .send(normalUser);

    // Login to get tokens
    const adminLoginResponse = await request(app)
        .post('/v1/users/login')
        .send({ email: 'admin@example.com', password: 'password123' });

    const userLoginResponse = await request(app)
        .post('/v1/users/login')
        .send({ email: 'user@example.com', password: 'password123' });

    adminToken = adminLoginResponse.body.token;
    userToken = userLoginResponse.body.token;
        // console.log(adminLoginResponse.body);
        // adminToken = adminLoginResponse.body.token;
        // userToken = userLoginResponse.body.token;
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async() => {
    await Course.deleteMany();
})


describe('Courses API Integration Tests', () => {
    test('POST /courses - should allow admin to create a course', async () => {
       
        const newCourse = { name: 'Machine Learning', rating: 5, difficulty: 'Advanced', price: 199 };
        console.log(adminToken);
        const response = await request(app)
            .post('/v1/courses')
            .set('Authorization', adminToken)
            .send(newCourse)
            .expect(200);

        expect(response.body).toMatchObject(newCourse);

        const courses = await Course.find();
        expect(courses.length).toBe(1);
        expect(courses[0].name).toBe('Machine Learning');
    });
});







