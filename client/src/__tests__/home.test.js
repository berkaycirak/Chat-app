import { setImmediate } from 'timers';
import {
	render,
	screen,
	fireEvent,
	renderHook,
} from '@testing-library/react';
import App from '../App';

import clientIO from 'socket.io-client';
import Chat from '../components/Chat';
import { BrowserRouter } from 'react-router-dom';
import { useScrollTo } from '../hooks/useScrollTo';

const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
// to solve "setImmediate is not defined error."
global.setImmediate = setImmediate;
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});
const socket = clientIO.connect('http://localhost:3001');

describe('App rendering', () => {
	it('home page input should have at least 6 char', () => {
		render(<App />);

		const inputElement = screen.getByTestId('input');
		fireEvent.change(inputElement, { target: { value: 'Berka' } });
		const btn = screen.getByRole('button');

		expect(btn).toBeDisabled();
	});
});

describe('Chat page rendering', () => {
	it('auto scroll should work', () => {
		const ref = {
			current: {
				scrollIntoView: jest.fn(),
			},
		};
		const messages = ['asdads', 'asdasd'];
		renderHook(() => useScrollTo(ref, messages));

		expect(ref.current.scrollIntoView).toHaveBeenCalledTimes(1);
	});
});
