import { useEffect } from 'react';

// for auto-scroll
export const useScrollTo = (messageRef, messages) => {
	useEffect(() => {
		messageRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);
};
