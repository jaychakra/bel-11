## WebSockets

### 1. Introduction

WebSockets is a protocol that enables full-duplex, bidirectional communication between a client (typically a web browser) and a server. Unlike traditional HTTP requests, WebSockets maintain a persistent connection, allowing real-time data exchange with minimal overhead.

Key advantages:

-   Real-time updates without polling
-   Reduced latency compared to HTTP requests
-   Efficient for applications requiring frequent, small data exchanges

### 2. WebSocket Protocol Overview

The WebSocket protocol starts with an HTTP handshake, then upgrades to a WebSocket connection:

1. Client sends an HTTP upgrade request
2. Server responds with a 101 Switching Protocols
3. The connection is now upgraded to WebSocket

Example handshake request:

```http
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Version: 13
```

Server response:

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```
Visual representation:

```
Client                                 Server
  |                                      |
  |         1. HTTP GET Request          |
  | -----------------------------------> |
  |     (Upgrade: websocket)             |
  |     (Sec-WebSocket-Key: [key])       |
  |                                      |
  |   2. HTTP 101 Switching Protocols    |
  | <----------------------------------- |
  |     (Upgrade: websocket)             |
  |     (Sec-WebSocket-Accept: [hash])   |
  |                                      |
  |                                      |
  |  3. WebSocket Connection Established |
  | <==================================> |
  |                                      |
  |     4. WebSocket Data Exchange       |
  | <==================================> |
  |                                      |
```

### 3. Setting Up WebSockets in Node.js

We'll use the `ws` library for WebSocket functionality in Node.js.

First, install the library:

```bash
npm install ws
```

Basic server setup:

```js
const WebSocket = require('ws');
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server');
});

// Create a WebSocket server by passing the HTTP server
const wss = new WebSocket.Server({ server });

// Handle new WebSocket connections
wss.on('connection', (ws) => {
    console.log('New client connected');
    // Handle incoming messages
    ws.on('message', (message) => {
        console.log('Received:', message.toString());
        // Echo the message back to the client
        ws.send(`Server received: ${message}`);
    });

    // Handle disconnections
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
```

### 4. Setting up WebSocket on the Client

Sending messages from client to server (browser JavaScript):

```js
const socket = new WebSocket('ws://localhost:3000')

socket.onopen = () => {
    socket.send('Hello from client!')
}

socket.onmessage = event => {
    console.log('Received:', event.data)
}
```

### 5. Socket.IO

Socket.IO is a powerful library that enables real-time, bidirectional and event-based communication between web clients and servers. It's built on top of the WebSocket protocol and provides additional features like automatic reconnection, broadcast support, and fallback options for older browsers.

### Key Features of Socket.IO:

1. Real-time bidirectional event-based communication
2. Works on every platform, browser or device
3. Reliability and auto-reconnection
4. Multiplexing support
5. Room support for broadcasting to a subset of clients

### Setting up Socket.IO

First, install Socket.IO in your Node.js project:

```bash
npm install socket.io
```

### Live Cricket Match Score Example

Let's create a simple live cricket match score application using Socket.IO. We'll have a server that updates the score and clients that receive these updates in real-time.

#### Server-side code (server.js):

```js
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

let score = {
    runs: 0,
    wickets: 0,
    overs: 0,
}

// Serve the main score page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client2.html');
});

// Serve the admin panel
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/admin.html');
});

io.on('connection', socket => {
    console.log('A user connected')
    // Send current score to newly connected client
    socket.emit('score update', score)

    // Listen for score updates from admin
    socket.on('update score', newScore => {
        score = newScore
        io.emit('score update', score)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

```

#### Client-side code (client2.html):

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Live Cricket Score</title>
        <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
    </head>
    <body>
        <h1>Live Cricket Score</h1>
        <div id="score">
            Runs: <span id="runs">0</span><br />
            Wickets: <span id="wickets">0</span><br />
            Overs: <span id="overs">0</span>
        </div>

        <script>
            const socket = io('http://127.0.0.1:3000')
            socket.on('score update', score => {
                document.getElementById('runs').textContent = score.runs
                document.getElementById('wickets').textContent = score.wickets
                document.getElementById('overs').textContent = score.overs
            })
        </script>
    </body>
</html> 
```

#### Client-side code (admin.html):

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Panel - Live Cricket Score</title>
        <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
    </head>
    <body>
        <h1>Admin Panel</h1>
        <input type="number" id="runsInput" placeholder="Runs" />
        <input type="number" id="wicketsInput" placeholder="Wickets" />
        <input type="number" id="oversInput" placeholder="Overs" />
        <button onclick="updateScore()">Update Score</button>

        <script>
            const socket = io('http://127.0.0.1:3000')
            function updateScore() {
                const newScore = {
                    runs:
                        parseInt(document.getElementById('runsInput').value) ||
                        0,
                    wickets:
                        parseInt(
                            document.getElementById('wicketsInput').value
                        ) || 0,
                    overs:
                        parseFloat(
                            document.getElementById('oversInput').value
                        ) || 0,
                }
                socket.emit('update score', newScore)
            }
        </script>
    </body>
</html> 
```

### 6. Best Practices and Security Considerations

1. Implement proper authentication:

    ```javascript
    wss.on('connection', (ws, req) => {
        // Check authentication token in request headers
        const token = req.headers['authorization']
        if (!isValidToken(token)) {
            ws.close()
            return
        }
        // ... continue with authenticated connection
    })
    ```

2. Implement rate limiting:

    ```javascript
    const RATE_LIMIT = 10 // messages per second
    const MESSAGE_INTERVAL = 1000 // 1 second

    ws.on('message', message => {
        const now = Date.now()
        if (
            !ws.lastMessageTime ||
            now - ws.lastMessageTime > MESSAGE_INTERVAL
        ) {
            ws.messageCount = 1
            ws.lastMessageTime = now
        } else {
            ws.messageCount++
            if (ws.messageCount > RATE_LIMIT) {
                ws.close()
                return
            }
        }
        // ... process message
    })
    ```

3. Validate and sanitize input to prevent XSS attacks
4. Use WSS (WebSocket Secure) in production
5. Implement proper error handling and logging

### 7. Q&A and Conclusion

Recap key points:

-   WebSockets enable real-time, bidirectional communication
-   The `ws` library provides a robust WebSocket implementation for Node.js
-   Proper error handling, authentication, and security measures are crucial
-   WebSockets are ideal for applications requiring frequent, real-time updates

Further learning resources:

-   [WebSocket API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
-   [ws library documentation](https://github.com/websockets/ws)
-   [Socket.IO](https://socket.io/) (a higher-level library built on WebSockets)
