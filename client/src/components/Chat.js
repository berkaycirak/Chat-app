import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Chat({ socket }) {
	const [message, setMessage] = useState();
	const navigate = useNavigate();

	const handleClick = () => {
		localStorage.removeItem('username');
		navigate('/');
		window.location.reload();
	};

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (localStorage.getItem('username')) {
			socket.emit('message', {
				name: socket.id,
			});
		}

		setMessage('');
	};

	console.log(message);
	return (
		<div className='flex flex-col items-center justify-center h-[100vh] bg-red-300 p-12'>
			<div className='self-end mr-16 mb-10'>
				<button
					className='border p-2 rounded-md bg-black text-white transition hover:bg-red-500'
					onClick={handleClick}>
					Exit
				</button>
			</div>
			<div className='border-2 w-[50%] h-[50%] bg-gray-100 rounded-md '>
				<div className=' text-2xl p-2'>Chat</div>
			</div>
			<div className='w-[50%]'>
				<textarea
					name='text-msg'
					id=''
					className='p-2 my-5 rounded-md focus:outline-none w-full'
					placeholder='Write your message...'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button
					className='border-2 rounded-md p-2'
					onClick={handleSendMessage}>
					Send
				</button>
			</div>
		</div>
	);
}

export default Chat;
