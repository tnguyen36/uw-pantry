import socketIOClient from 'socket.io-client';
var endpoint = 'https://uwpantry.herokuapp.com';
var socket = socketIOClient(endpoint);

export { socket };