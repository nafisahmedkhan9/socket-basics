var mysql = require('mysql');
var PORT = process.env.PORT || 3308 ;
var sql;
exports.searching = function(start, end, cb){
	var connection = mysql.createConnection({
		host: 'https://socketchatting.herokuapp.com',
		port: PORT,
		user: '',
		password: '',
		database: ''
	});
	connection.connect();
	if(start > end){
		sql = "SELECT * FROM chathistory WHERE timestamp<"+start+" && "+"timestamp>"+end;	
	}else{
		sql = "SELECT * FROM chathistory WHERE timestamp>"+start+" && "+"timestamp<"+end;	
	}
	console.log(sql);
	connection.query(sql, function(err, result) {
	    if (err) throw err;
	    //console.log(result);
	    cb(result) ;
	});
	connection.end();
}