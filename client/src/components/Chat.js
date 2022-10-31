import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Chat({ socket, username }) {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const navigate = useNavigate();

	const handleExit = () => {
		navigate('/');
		window.location.reload();
	};

	const handleSendMessage = (e) => {
		e.preventDefault();

		socket.emit('message', {
			name: username,
			message: message,
			socketID: socket.id,
		});

		setMessage('');
	};

	useEffect(() => {
		socket.on('messageResponse', (data) =>
			setMessages([...messages, data])
		);
	}, [socket, messages]);

	return (
		<div className='flex flex-col items-center justify-center h-[100vh] bg-red-300 p-12'>
			<div className='self-end mr-16 mb-10'>
				<button
					className='border p-2 rounded-md bg-black text-white transition hover:bg-red-500'
					onClick={handleExit}>
					Exit
				</button>
			</div>
			<div className='border-2 w-[50%] h-[50%] bg-gray-100 overflow-y-scroll rounded-md '>
				<div className=' text-2xl p-2'>
					{messages.map((item) =>
						item.name === username ? (
							<div className='bg-red-200'>
								<h1>You</h1>
								<p>{item.message}</p>
							</div>
						) : (
							<div className='bg-green-200'>
								<h1>{item.name}</h1>
								<p>{item.message}</p>
							</div>
						)
					)}
				</div>
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
