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

let users = [];

io.on('connection', (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);
	socket.on('disconnect', () => {
		console.log('🔥: A user disconnected');
		users = users.filter((user) => user.socketID !== socket.id);

		io.emit('newUserResponse', users);
	});

	socket.on('message', (data) => {
		io.emit('messageResponse', data);
	});
	socket.on('typing', (data) =>
		socket.broadcast.emit('typingResponse', data)
	);
	socket.on('notyping', (data) =>
		socket.broadcast.emit('typingResponse', data)
	);
	socket.on('newUser', (data) => {
		users.push(data);

		io.emit('newUserResponse', users);
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
