# Streams

- Steams are Objects in NodeJS
- Streams are collections of data that might not be available all at once
- Streams are particularly useful for handling large amounts of data efficiently, as they enable you to process data piece by piece rather than loading it all into memory at once.
- Streams can be thought of as a **sequence of data elements made available over time**

## Types of Streams

### 1. Readable Stream

A readable stream is a source of data that you can read from. It emits events as data becomes available.
The sources can be file, database

### 2. Writable Stream

A writable stream is a destination for data that you can write to. You can write data to it in chunks.

```js
const fs = require('fs');
// Create a writable stream to a file
const writableStream = fs.createWriteStream('output.txt');
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
```

### 3. Duplex Stream

A duplex stream is a stream that can be both readable and writable. You can read from it and write to it simultaneously.

Chat server
```js
const net = require('net');
const { Duplex } = require('stream');

// Custom Duplex Stream for each client
class ClientDuplexStream extends Duplex {
  constructor(socket) {
    super();
    this.socket = socket;
    this.socket.on('data', (chunk) => this.push(chunk)); // Pipe data to readable side
    this.socket.on('end', () => this.push(null));
  }

  _write(chunk, encoding, callback) {
    this.socket.write(chunk, encoding, callback); // Write to the socket
  }

  _read(size) {
    // No-op, data pushed via socket 'data' event
  }
}

const clients = new Set();

const server = net.createServer((socket) => {
  const clientStream = new ClientDuplexStream(socket);
  clients.add(clientStream);

  console.log('Client connected');
  clientStream.write('Welcome to the chat server!\n');

  clientStream.on('data', (chunk) => {
    const message = `Client: ${chunk.toString()}`;
    console.log(message);

    // Broadcast the message to all clients
    for (const client of clients) {
      if (client !== clientStream) {
        client.write(message);
      }
    }
  });

  clientStream.on('end', () => {
    console.log('Client disconnected');
    clients.delete(clientStream);
  });

  clientStream.on('error', (err) => {
    console.error('Client stream error:', err);
    clients.delete(clientStream);
  });
});

server.listen(8080, () => {
  console.log('Chat server listening on port 8080');
});
```

Chat client
```js
const net = require('net');

const client = net.createConnection({ port: 8080 }, () => {
  console.log('Connected to chat server');
  process.stdin.pipe(client); // Pipe stdin to the server
});

client.on('data', (data) => {
  console.log(`Received: ${data}`);
});

client.on('end', () => {
  console.log('Disconnected from chat server');
});

client.on('error', (err) => {
  console.error('Client error:', err);
});

process.stdin.on('end', () => {
  client.end();
});
```

### 4. Transform Stream

A transform stream is a type of duplex stream that can modify or transform the data as it is written and read.

```js
const { Transform } = require('stream');
const fs = require('fs');
// Create a transform stream that converts data to uppercase
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        // Convert chunk to uppercase and push it to the readable side
        this.push(chunk.toString().toUpperCase());
        callback();
}
});
// Pipe readable stream to transform stream and then to writable stream

const readableStream = fs.createReadStream('./preTranformInput.txt', { encoding: 'utf8' });
const writableStream = fs.createWriteStream('tranformedOutput.txt');

readableStream.pipe(upperCaseTransform).pipe(writableStream);

writableStream.on('finish', () => {
    console.log('Finished transforming and writing to file.');
});
```

## Stream Methods

### 1. pause

The pause method is used to temporarily stop the flow of data from a readable stream. This can be useful when you need to control the rate of data processing.

### 2. resume

The resume method is used to resume the flow of data from a paused readable stream. This allows you to control the data flow based on your application's needs.

### 3. pipe

The pipe method is used to connect the output of a readable stream to the input of a writable stream. It automatically manages the flow of data and handles backpressure.

Streams without `pipe()`

```js
const fs = require('fs');

// Create a readable stream with a highWaterMark
const readableStream = fs.createReadStream('input.txt', { highWaterMark: 64 * 1024 }); // 64 KB

// Create a writable stream
const writableStream = fs.createWriteStream('outputBackpressureFile.txt', { highWaterMark: 16 * 1024 }); // 16 KB

readableStream.on('data', (chunk) => {
  console.log(`Read ${chunk.length} bytes`);
  
  // If writable stream's buffer is full, pause readable stream
  if (!writableStream.write(chunk)) {
    console.log('Writable stream is full, pausing readable stream');
    readableStream.pause();
  }
});

// Resume readable stream when writable stream drains
writableStream.on('drain', () => {
  console.log('Writable stream drained, resuming readable stream');
  readableStream.resume();
});

// Handle end of readable stream
readableStream.on('end', () => {
  console.log('Readable stream ended');
  writableStream.end();
});

// Handle errors
readableStream.on('error', (err) => {
  console.error('Error reading file:', err);
});

writableStream.on('error', (err) => {
  console.error('Error writing file:', err);
});
```

Streams with `pipe()`

```js
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

```

### 4. unpipe

The unpipe method is used to stop piping data from a readable stream to a writable stream. This can be useful when you want to stop the flow of data.

