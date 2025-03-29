const fs = require('fs');

// Create a readable stream with a highWaterMark
const readableStream = fs.createReadStream('input.txt', { highWaterMark: 64 * 1024 }); // 64 KB

// Create a writable stream
const writableStream = fs.createWriteStream('outputPipedFile.txt', { highWaterMark: 16 * 1024 }); // 16 KB

// Pipe the readable stream to the writable stream
readableStream.pipe(writableStream);

// Handle events
readableStream.on('data', (chunk) => {
  console.log(`Read ${chunk.length} bytes`);
});

readableStream.on('end', () => {
  console.log('Readable stream ended');
});

writableStream.on('finish', () => {
  console.log('Writable stream finished');
});

// Handle errors
readableStream.on('error', (err) => {
  console.error('Error reading file:', err);
});

writableStream.on('error', (err) => {
  console.error('Error writing file:', err);
});