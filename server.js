var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var dbconnnect = require('./insertintodb.js');
var dbsearch = require('./searchfromdb.js');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

function sendCurrentUsers (socket) {
	var info = clientInfo[socket.id];
	var users = [];

	if (typeof info === 'undefined'){
		return;
	}

	Object.keys(clientInfo).forEach( function(socketId) {
		var userInfo = clientInfo[socketId];

		if (info.room === userInfo.room) {
			users.push(userInfo.name);
		}	
	});

	var dataobj = {
		name: 'System',
		room: info.room,
		text: 'Current Users: '+ users.join(', '),
		timestamp: moment().valueOf()
	}
	//dbconnnect.insertfunc(dataobj);
	socket.emit('message',dataobj);
}

io.on('connection', function(socket){
	console.log('User connected via socket.io!.');

	socket.on('disconnect', function(){
		var userData = clientInfo[socket.id];

		if(typeof userData !== 'undefined'){
			socket.leave(userData.room);
			io.to(userData.room).emit('message', {

				name: 'System',
				text: userData.name + ' has left!',
				timestamp: moment().valueOf()
			});
			delete clientInfo[socket.id];
		}
	});

	socket.on('joinRoom', function(req){
		clientInfo[socket.id] = req;
		socket.join(req.room);
		var dataobj = {
			name: 'System',
			room: req.room,
			text: req.name + ' has joined!',
			timestamp: moment().valueOf()
		}
		//dbconnnect.insertfunc(dataobj);
		socket.broadcast.to(req.room).emit('message', dataobj);
	});

	socket.on('message',function(message){
		console.log('Message received: ' + message.text);

		message.room = clientInfo[socket.id].room;
		message.timestamp = moment().valueOf();

		//dbconnnect.insertfunc(message);

		if(message.text === '@currentUsers'){
			sendCurrentUsers(socket);
		}else{
			message.timestamp = moment().valueOf();
			io.to(clientInfo[socket.id].room).emit('message', message);	
		}	
	});

	// socket.on('query', function(time){
	// 	var fromtime = time.from;
	// 	var totime = time.to;
	// 	var fromtimestamp = moment(fromtime, "DD-MM-YYYY h:m a");
	// 	var totimestamp = moment(totime, "DD-MM-YYYY h:m a");
	// 	dbsearch.searching(fromtimestamp, totimestamp,function(data){
	// 		console.log("data is " + data.length);
	// 		socket.emit('queryAnswer',{
	// 			name: 'system',
	// 			data: data,
	// 			timestamp: moment().valueOf()
	// 		});
	// 	});
	// });

	socket.emit('message',{
		name: 'system',
		text: 'Welcome to the chat application!',
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function() {
	console.log("Server started!");
});