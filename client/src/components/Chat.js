import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActiveUsers from './ActiveUsers';
import { useScrollTo } from '../hooks/useScrollTo';

function Chat({ socket, username }) {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [typingStatus, setTypingStatus] = useState();
	const navigate = useNavigate();
	const lastMessageRef = useRef(null);

	const handleExit = () => {
		navigate('/');
		window.location.reload();
	};
	console.log(message);
	const handleTyping = () => {
		if (message !== '') {
			socket.emit('typing', `${username} is typing...`);
		} else {
			socket.emit('notyping', '');
		}
	};
	const handleSendMessage = (e) => {
		e.preventDefault();
		socket.emit('message', {
			name: username,
			message: message,
			socketID: socket.id,
		});
		socket.emit('notyping', '');

		setMessage('');
	};

	useScrollTo(lastMessageRef, messages);

	useEffect(() => {
		socket.on('messageResponse', (data) =>
			setMessages([...messages, data])
		);
	}, [socket, messages]);

	// for notification
	useEffect(() => {
		socket.on('typingResponse', (data) => setTypingStatus(data));
	}, [socket]);

	return (
		<div className=' flex items-center justify-center h-[100vh] bg-red-300 p-12'>
			<div data-testid='active'>
				<ActiveUsers socket={socket} />
			</div>
			<div className='flex flex-col min-w-[1100px] '>
				<div className='flex items-center gap-2 self-end  mb-10'>
					<h1 className='font-bold'>{username}</h1>
					<button
						className='border p-2 rounded-md bg-black text-white transition hover:bg-red-500'
						onClick={handleExit}>
						Exit
					</button>
				</div>
				<div className='relative border-2 w-[60%] h-[440px] self-center  bg-gray-100 overflow-y-scroll rounded-md '>
					<div className=' text-2xl p-2 '>
						{messages.map((item) =>
							item.name === username ? (
								<div className='bg-red-200 border rounded-md m-2 p-4'>
									<h1 className='text-green-500'>You</h1>
									<p>{item.message}</p>
								</div>
							) : (
								<div className='bg-green-200 p-4 rounded-md'>
									<h1 className='text-gray-500'>{item.name}</h1>
									<p>{item.message}</p>
								</div>
							)
						)}
					</div>
					<div ref={lastMessageRef} />
					<div className=' bottom-0'>{typingStatus}</div>
				</div>
				<div className='w-[60%] self-center'>
					<textarea
						name='text-msg'
						id=''
						className='p-2 my-5 rounded-md focus:outline-none w-full'
						placeholder='Write your message...'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyUp={handleTyping}
					/>
					<button
						className='border-2 rounded-md p-2'
						data-testid='sendBtn'
						onClick={(e) => {
							if (message.trim()) {
								handleSendMessage(e);
							}
						}}>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}

export default Chat;
