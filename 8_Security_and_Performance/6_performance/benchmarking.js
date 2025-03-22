const Benchmark = require('benchmark');
const crypto = require('crypto');

// Function to generate a random string
function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

// Function to hash a password using bcrypt (simulated)
function hashPasswordBcrypt(password) {
  // Simulate bcrypt hashing (actual bcrypt would be much slower)
  return crypto.pbkdf2Sync(password, 'salt', 10000, 64, 'sha512').toString('hex');
}

// Function to hash a password using Argon2 (simulated)
function hashPasswordArgon2(password) {
  // Simulate Argon2 hashing (actual Argon2 would be different)
  return crypto.scryptSync(password, 'salt', 64).toString('hex');
}

// Create a test suite
const suite = new Benchmark.Suite;

// Generate a sample password
const password = generateRandomString(12);

// Add tests
suite.add('Bcrypt Hashing', function() {
  hashPasswordBcrypt(password);
})
.add('Argon2 Hashing', function() {
  hashPasswordArgon2(password);
})
// Add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// Run async
.run({ 'async': true });