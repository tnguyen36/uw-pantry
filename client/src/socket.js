import socketIOClient from 'socket.io-client';
var endpoint = 'localhost:3001';
var socket = socketIOClient(endpoint);

export { socket };