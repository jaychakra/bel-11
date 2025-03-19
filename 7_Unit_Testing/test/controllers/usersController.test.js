const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const JWT_SECRET = "AIRTRIBE_JWT_SECRET"
const usersModel = require("../../src/models/usersModel");
const { registerUser, loginUser } = require("../../src/controllers/usersController");
const mongoose = require('mongoose');
const {MongoMemoryServer} =  require("mongodb-memory-server");

let mongoServer;

beforeAll( async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    // Connect mongoose to the in-memory database
    await mongoose.connect(uri);
});

afterAll(async () => {
    // Close the connection to the in-memory database
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});


describe('Test user Registration', () => {
    
    it('should register a new user successfully with all fields', async () => {

        const user = {
            name: "John Doe",
            email: "test@example.com",
            password: "password123",
            role: "user"
        };

        const dbUser = await registerUser(user);

        expect(dbUser).toHaveProperty("_id");
        expect(dbUser.name).toBe(user.name);
        expect(dbUser.email).toBe(user.email);
        expect(dbUser.role).toBe(user.role);
        expect(bcrypt.compareSync(user.password, dbUser.password)).toBe(true); 
    });
});



