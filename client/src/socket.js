import socketIOClient from 'socket.io-client';
var endpoint = 'https://uwt-pantry.herokuapp.com';
var socket = socketIOClient(endpoint);

export { socket };