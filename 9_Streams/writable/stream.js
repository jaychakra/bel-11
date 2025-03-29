const fs = require('fs');
// Create a writable stream to a file
const writableStream = fs.createWriteStream('../output/writeResponse.txt');
// Write data to the stream
writableStream.write('Hello, World!\n');
writableStream.write('This is a writable stream example.\n');
// End the stream
writableStream.end(() => {
    console.log('Finished writing to file.');
});
// Handle error event
writableStream.on('error', (err) => {
    console.error('Error writing to file:', err);
});