const crypto = require('crypto');


// Encoding
// Function to encode data to Base64
function encode(text) {
    return Buffer.from(text).toString('base64'); // Encode to Base64
}

// Function to decode data from Base64
function decode(encodedText) {
    return Buffer.from(encodedText, 'base64').toString('utf8'); // Decode from Base64
}



// Encryption
// Function to encrypt data
function encrypt(text, key) {
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted; // Return IV and encrypted data
}



// Example usage
const key = crypto.randomBytes(32); // Generate a random key
const originalText = "Hello, World!";
const encryptedText = encrypt(originalText, key);
console.log("Encrypted:", encryptedText);



// Hashing
// Function to hash data
function hash(text) {
    return crypto.createHash('sha256').update(text).digest('hex'); // SHA-256 hash
}

// Example usage
const originalText = "Hello, World!";
const hashedText = hash(originalText);
console.log("Hashed:", hashedText);