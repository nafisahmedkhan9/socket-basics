var socket = io();

socket.on('connect', function() {
	console.log('Connect the socket.io server');
});

/*socket.emit('message', {
	text: 'Welcome to the chat application!'
});*/

socket.on('message', function(message) {
	console.log('New message: ');
	console.log(message.text);
});