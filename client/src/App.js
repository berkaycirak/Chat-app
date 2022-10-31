import Home from './components/Home';
import Chat from './components/Chat';
import io from 'socket.io-client';
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import { useState } from 'react';
const socket = io.connect('http://localhost:3001');

function App() {
	const [username, setUsername] = useState();
	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<Home
					socket={socket}
					username={username}
					setUsername={setUsername}
				/>
			),
		},
		{
			path: '/chat',
			element: (
				<Chat
					socket={socket}
					username={username}
					setUsername={setUsername}
				/>
			),
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
