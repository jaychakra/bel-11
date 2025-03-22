const crypto = require('crypto');

// Function to hash data
function hash(text) {
    return crypto.createHash('sha256').update(text).digest('hex'); // SHA-256 hash
}

// Example usage
const originalText = "Hello, World!, Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!Hello, World!";
const hashedText = hash(originalText);
console.log("Hashed:", hashedText);