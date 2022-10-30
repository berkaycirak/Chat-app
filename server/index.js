const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);
	socket.on('disconnect', () => {
		console.log('🔥: A user disconnected');
	});
});

app.get('/api', (req, res) => {
	res.json({
		message: 'Hello world',
	});
});

server.listen(3001, () => {
	console.log('Server is running on 3001');
});
