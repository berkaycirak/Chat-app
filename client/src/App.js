import Home from './components/Home';
import Chat from './components/Chat';
import io from 'socket.io-client';
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Link,
} from 'react-router-dom';
const socket = io.connect('http://localhost:3001');

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home socket={socket} />,
		},
		{
			path: '/chat',
			element: <Chat socket={socket} />,
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
