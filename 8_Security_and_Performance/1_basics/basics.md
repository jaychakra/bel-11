# Security and performance in NodeJS

## Difference between encoding, encryption and hashing

### Encoding

**Definition**: Encoding is the process of converting data from one format to another for various purposes, such as data transmission or storage. Unlike encryption and hashing, encoding is not meant for security but rather for data representation.

**Characteristics**:
- **Reversible**: Encoded data can be easily converted back to its original format.
- **No Security**: Encoding does not provide confidentiality or integrity; it is simply a way to represent data.
- **Use Cases**: Data transmission (e.g., Base64), data storage, and compatibility with different systems.

**Example**:
```javascript
// Function to encode data to Base64
function encode(text) {
    return Buffer.from(text).toString('base64'); // Encode to Base64
}

// Function to decode data from Base64
function decode(encodedText) {
    return Buffer.from(encodedText, 'base64').toString('utf8'); // Decode from Base64
}

// Example usage
const originalText = "Hello, World!";
const encodedText = encode(originalText);
const decodedText = decode(encodedText);
console.log("Encoded:", encodedText);
console.log("Decoded:", decodedText);
```

### Encryption

**Definition**: Encryption is the process of converting plaintext into ciphertext using an algorithm and a key. The main purpose of encryption is to ensure confidentiality, allowing only authorized parties to access the original data.

**Characteristics**:
- **Reversible**: Encrypted data can be decrypted back to its original form using the correct key.
- **Key-based**: Requires a key for both encryption and decryption.
- **Use Cases**: Secure communication, data protection, etc.

**Example**:
```javascript
const crypto = require('crypto');

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
```

### Hashing

**Definition**: Hashing is the process of converting data into a fixed-size string of characters, which is typically a digest that represents the original data. Hashing is a one-way function, meaning it cannot be reversed to retrieve the original data.

**Characteristics**:
- **Irreversible**: Once data is hashed, it cannot be converted back to its original form.
- **Deterministic**: The same input will always produce the same hash output.
- **Use Cases**: Data integrity verification, password storage, etc.

**Example**:
```javascript
const crypto = require('crypto');

// Function to hash data
function hash(text) {
    return crypto.createHash('sha256').update(text).digest('hex'); // SHA-256 hash
}

// Example usage
const originalText = "Hello, World!";
const hashedText = hash(originalText);
console.log("Hashed:", hashedText);
```

### Summary of Differences

| Feature         | Encryption                          | Hashing                          | Encoding                          |
|------------------|-------------------------------------|----------------------------------|-----------------------------------|
| Purpose          | Confidentiality                     | Data integrity                   | Data representation               |
| Reversibility    | Reversible (with key)              | Irreversible                     | Reversible                        |
| Output Size      | Variable (depends on algorithm)     | Fixed size                       | Variable (depends on encoding)    |
| Key Requirement  | Requires a key                      | No key required                  | No key required                   |
| Security         | Provides confidentiality            | Provides integrity                | No security                       |
| Use Cases        | Secure data transmission            | Password storage, data integrity | Data transmission, storage        |

### Summary

- **Encryption** is used to protect data confidentiality and requires a key for both encryption and decryption.
- **Hashing** is used to verify data integrity and is irreversible, meaning you cannot retrieve the original data from the hash.
- **Encoding** is used to convert data into a different format for compatibility or transmission purposes and is easily reversible.

Each of these techniques serves a different purpose in data handling and security, and understanding their differences is crucial for implementing the right solution in various scenarios.