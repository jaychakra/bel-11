const express = require('express');
const bodyParser = require('body-parser');
const csrf = require('csurf');  // Use express-csrf instead of csurf
const session = require('express-session');
const cors = require('cors');
const app = express();

// 1. Enable CORS with specific options
// Let's request from specific origin to hit the server
// cors: Cross Origin Request Sharing
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST'],
//   credentials: true
// }));

// 2. Set up session management
app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true,
  cookie: {
    httpOnly: true,
    sameSite: 'Strict',  
  }
}));

// 3. Set up CSRF protection
// ensuring that requests that modify data (such as POST requests) are coming from trusted sources
// CSRF token is stored in a cookie in the user’s browser, which is sent automatically with requests to the server
// When a form is rendered, the CSRF token is embedded in the HTML (typically in a hidden input field). 
// The client-side JavaScript or the server sends this token back with any subsequent requests, ensuring the request is legitimate.
// Ex:   <input type="hidden" name="_csrf" value="${req.csrfToken()}">

app.use(csrf({ cookie: true })); 

app.use(bodyParser.urlencoded({ extended: true }));

let users = {
  alice: { balance: 10000 },
  attacker: { balance: 0 }
};

// Route to simulate money transfer (protected against CSRF)
app.post('/transfer', (req, res) => {
  const { from, to, amount, _csrf } = req.body;

  // Validate users and process transfer
  if (!users[from] || !users[to]) {
    return res.status(400).send('Invalid users');
  }

  users[from].balance -= parseInt(amount, 10);
  users[to].balance = (users[to].balance || 0) + parseInt(amount, 10);

  const message = `Transferred ${amount} from ${from} to ${to}.`;
  console.log(message);
  console.log("Current Balances: ", users);

  res.send(message);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});