import { useEffect, useState } from 'react';

function ActiveUsers({ socket }) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		console.log('Hello');
		socket.on('newUserResponse', (data) => setUsers(data));
	}, [socket]);

	return (
		<div
			className='h-full bg-gray-100 p-4 rounded-md'
			data-testid='active_users'>
			<div>
				<h1>Active Users</h1>
				<div>
					{users.map((user) => (
						<h4
							className='text-green-600 font-bold'
							key={user.socketID}>
							{user.username}
						</h4>
					))}
				</div>
			</div>
		</div>
	);
}

export default ActiveUsers;
