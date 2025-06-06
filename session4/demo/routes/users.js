const express = require("express");
const router = express.Router();
router.use(express.json());
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const usersModel = require("../models/usersModel");

const registerUserHandler = async (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, saltRounds);
    const dbUser = await usersModel.create(user);
    console.log(dbUser);
    res.send(dbUser);
};

const loginUserHandler = async (req, res) => {
    const { email, password } = req.body;

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

    // const response = {_id: dbUser._id, email: dbUser.email, role: dbUser.role};
    return res.status(200).send({token: token});
}

router.post("/register", registerUserHandler);
router.post("/login", loginUserHandler);
module.exports = router;





/*
22 GoF patterns

Headfirst Design Patterns
reafctoring.guru




13 different patterns
Schema design pattern ==> 


// register
Appraoch 1: POST /users
POST /users/register



/users
- if ()




Approach 2: POST /users/register



// login
// Update password, email ==> Hold
POST /register
POST /login
*/


/*
    Issues: Password is stored as plain text
    - Hashing ==> Hashing is a one way function
    - Encryption/decryption ==> Encryption is reversible function
    - Encoding/decode ==> Encoding is a reversible function
    Hashing  12345678 ==> %10 => 8
    
    encryption(key) 12345678 ==> key12345678
    
    
    encoding 12345678 ==> abdcd

*/




/*
- By implementing some policies
- OAuth
- JWT
- User Role 


-Login (UserXYZ)
-> Token (ABC)
-> DB Entry (UserXYZ -> ABC )

Sessions table
userId, token, expiry
U1, ABC, 2022-12-12 12:12:12






Create a course 
Extract the token
validate it against the DB
Need to validate the roles 
If valid, create a course
*/


// Jobs of a system that manages token
// - A token should uniquely identify a user
// - Token should have expiry
// - Mechanism to invalidate / destroy a token
// - Token may contain some data 
// - Good to have feature Refresh tokens () ==> Depends on use case to use case
// - Who should own the generation of token?


/* Anatomy of a JWT Token (JSON Web Token)
Headers
- 
Payload: 
role: user -> admin
-
Signature: Hash f(headers, payload, "SECRETCODE")




*/









