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
		// console.log(users);
		//Sends the list of users to the client
		io.emit('newUserResponse', users);
	});

	socket.on('message', (data) => {
		io.emit('messageResponse', data);
	});
	//Listens when a new user joins the server
	socket.on('newUser', (data) => {
		//Adds the new user to the list of users
		users.push(data);
		// console.log(users);
		//Sends the list of users to the client
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
