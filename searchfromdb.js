var mysql = require('mysql');
var PORT = process.env.PORT || 3308 ;
exports.searching = function(start, end, cb){
	var connection = mysql.createConnection({
		host: '',
		port: PORT,
		user: '',
		password: '',
		database: ''
	});
	connection.connect();
		password: '',
	if(start > end){
		var sql = "SELECT * FROM chathistory WHERE timestamp<"+start+" && "+"timestamp>"+end;	
	}else{
		var sql = "SELECT * FROM chathistory WHERE timestamp>"+start+" && "+"timestamp<"+end;	
	}
	
	console.log(sql);
	connection.query(sql, function(err, result) {
	    if (err) throw err;
	    //console.log(result);
	    cb(result) ;
	});
	connection.end();
}