var socket = io();

socket.on('connect', function() {
	console.log('Connect the socket.io server');
})