var mysql = require('mysql');
exports.searching = function(start, end, cb){
	var connection = mysql.createConnection({
		host: 'localhost',
		port: 3308,
		user: 'root',
		password: 'root',
		database: 'naf'
	});
	connection.connect();
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