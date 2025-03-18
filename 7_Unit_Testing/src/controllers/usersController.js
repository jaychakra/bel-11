
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET
const usersModel = require("../models/usersModel");

const registerUser = async (user) => {
    user.password = bcrypt.hashSync(user.password, saltRounds);
    const dbUser = await usersModel.create(user);
    return dbUser;
};
 
const loginUser = async (email, password) => {
    
    const body = {
        email: email
    };

    const dbUser = await usersModel.findOne(body);

    if (!dbUser) {
        return res.status(404).send({messsage: "User not found"});
    }

    const isSamePassword = await bcrypt.compare(password,dbUser.password);
    
    if (!isSamePassword) {
        return res.status(401).send({message :"Invalid Password"});
    }
    
    const token = jwt.sign({email: dbUser.email, role: dbUser.role}, JWT_SECRET, {expiresIn: "1h"});

    return token;
}


module.exports = {registerUser, loginUser};