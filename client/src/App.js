import Home from './components/Home';
import Chat from './components/Chat';
import io from 'socket.io-client';
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Link,
} from 'react-router-dom';
import { useRef } from 'react';
const socket = io.connect('http://localhost:3001');

function App() {
	const userRef = useRef();
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home socket={socket} username={userRef} />,
		},
		{
			path: '/chat',
			element: <Chat socket={socket} username={userRef} />,
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
