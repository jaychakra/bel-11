const fs = require('fs');

const readableStream = fs.createReadStream('../input/leviathan.txt', { highWaterMark: 64 * 1024 }); // 64 KB

const writableStream = fs.createWriteStream('../output/backpressureFile.txt', { highWaterMark: 100 }); // 16 KB

readableStream.on('data', (chunk) => {
  console.log(`Read ${chunk.length} bytes`);
  
  // If writable stream's buffer is full, pause readable stream. Start again on drain
  // If it is not handled properly there can be data loss. 
  // Validate this by showing the size of input and output documents if pause and resume is not used
  
  // writableStream.write(chunk);
  
  if (!writableStream.write(chunk)) {
    console.log('Writable stream is full, pausing readable stream');
    // readableStream.pause();
  }
});

// writableStream.on('drain', () => {
//   console.log('Writable stream drained, resuming readable stream');
//   readableStream.resume();
// });

readableStream.on('end', () => {
  console.log('Readable stream ended');
  writableStream.end();
});

readableStream.on('error', (err) => {
  console.error('Error reading file:', err);
});

writableStream.on('error', (err) => {
  console.error('Error writing file:', err);
});