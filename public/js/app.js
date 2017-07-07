var socket = io();
var name = getQueryVariable("name") || 'Anonymous';
var room = getQueryVariable("room") || 'Anonymous'; 

//update h1 tag
jQuery('.room-title').text(room);

socket.on('connect', function() {
	//alert("getting connected");
	console.log('Connect the socket.io server');

	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function(message) {
	var momentTimestamp = moment.utc(message.timestamp);
	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>');
	console.log('New message: ');
	console.log(message.text);
	$message.append('<p><strong>'+ message.name + "  " +momentTimestamp.local().format("h:mm a")+"</strong></p>");
	$message.append("<p>"+ message.text +"</p>");
	$messages.append($message);

	// for handling scrolling : If new msg is send or recieve then scroll come at bottom
	$('#mylist').animate({scrollTop: $('#mylist').prop("scrollHeight")}, 500);
});

// socket.on('queryAnswer', function(message){  
// 	alert("bleh ")
//     console.log('message');
//     console.log("message"); 
// });

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val(),
	});
	$message.val('');
});