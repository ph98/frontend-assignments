import { io } from 'socket.io-client';

const URL = 'ws://localhost:8425/'

export const socket = io(URL);

