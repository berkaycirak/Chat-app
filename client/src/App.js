import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');
function App() {
	return (
		<div>
			<h1>Hello World</h1>
		</div>
	);
}

export default App;
