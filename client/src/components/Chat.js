function Chat({ socket }) {
	return (
		<div className='flex flex-col items-center justify-center h-[100vh] bg-red-300'>
			<div className='border-2 w-[50%] h-[50%] bg-gray-100 rounded-md '>
				<div className=' text-2xl p-2'>Chat</div>
			</div>
			<div className='w-[50%]'>
				<textarea
					name='text-msg'
					id=''
					className='p-2 my-5 rounded-md focus:outline-none w-full'
					placeholder='Write your message...'
				/>
			</div>
		</div>
	);
}

export default Chat;
