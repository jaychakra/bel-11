const fs = require('fs');
const crypto = require('crypto');
const { Transform, pipeline } = require('stream');
const path = require('path');

// openssl sha256 ./original.txt | awk '{print $2}' > original.text.sha256 --> This adds a new line to the end

// AB ==> XYZ
// CD ==> PQR


// XYZ + CD ==> PQR
// Transform stream to compute checksum
class ChecksumStream extends Transform {
  constructor(algorithm = 'sha256') {
    super();
    this.hash = crypto.createHash(algorithm);
  }

  _transform(chunk, encoding, callback) {
    this.hash.update(chunk); // Update the hash with the current chunk
    this.push(chunk); // Pass the chunk to the next stream in the pipeline
    callback();
  }

  _flush(callback) {
    this.emit('checksum', this.hash.digest('hex')); // Emit the final checksum when the stream ends
    callback();
  }
}

// Source and destination file paths
const sourceFile = path.resolve(__dirname, 'original.txt');
const destinationFile = path.resolve(__dirname, 'transferred.txt');

// Create streams
const readStream = fs.createReadStream(sourceFile); // Readable stream
const writeStream = fs.createWriteStream(destinationFile); // Writable stream
const checksumStream = new ChecksumStream(); // Transform stream for checksum

// Listen for checksum event
checksumStream.on('checksum', (transferedChecksum) => {
  const originalChecksum = fs.readFileSync('./original.text.sha256').toString();
  console.log(`Original checksum: ${originalChecksum} \nTransfered File checksum : ${transferedChecksum} \nAre they equal? ${originalChecksum === transferedChecksum}`);
});

// Pipe the streams
pipeline(
  readStream,
  checksumStream, // Compute checksum
  writeStream, // Write to destination
  (err) => {
    if (err) {
      console.error('Pipeline failed:', err);
    } else {
      console.log('File transfer complete and checksum computed.');
    }
  }
);