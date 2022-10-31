import { useNavigate } from 'react-router-dom';

function Home({ socket, setUsername, username }) {
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		socket.emit('newUser', { username, socketID: socket.id });
		navigate('/chat');
	};

	return (
		<div className='flex items-center justify-center h-[100vh] bg-red-300'>
			<form onSubmit={handleSubmit} className=' '>
				<h2 className='text-5xl text-white my-8'>
					Sign in to Open Chat
				</h2>
				<div className='flex items-center justify-center py-4'>
					<input
						type='text'
						minLength={6}
						name='username'
						id='username'
						className='border mx-4 rounded-md p-2 focus:outline-none'
						placeholder='Enter your username'
						autoComplete='off'
						onChange={(e) => setUsername(e.target.value)}
					/>
					<button
						className='border-2 font-bold border-black px-2 rounded-lg transition hover:bg-black hover:text-white hover:border-white '
						type='submit'>
						SIGN IN
					</button>
				</div>
			</form>
		</div>
	);
}

export default Home;
