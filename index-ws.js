const express = require('express');
const server = require('http').createServer();
const app = express();

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

server.on('request', app);
server.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

/** websocket server */

const WebSocketSever = require('ws').WebSocketServer;

const wss = new WebSocketSever({server});

wss.on('connection', (ws) => {
    const numClients = wss.clients.size;
    wss.broadcast(`new client connected. Total clients: ${numClients}`);

    if (ws.readyState === ws.OPEN) {
        ws.send('Welcome to websocket server');
    }

    ws.on('close', () => {
        wss.broadcast('Client disconnected. Total clients: ', wss.clients.size);
        console.log('Client disconnected');
    });
});

wss.broadcast = (data) => {
    wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(data);
        }
    });
}
