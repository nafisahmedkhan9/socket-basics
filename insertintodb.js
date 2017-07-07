var mysql = require('mysql');
exports.insertfunc = function(dataobj){
	var connection = mysql.createConnection({
		host: 'localhost',
		port: 3308,
		user: 'root',
		password: 'root',
		database: 'naf'
	});
	connection.connect();
	if (dataobj.room === "Anonymous") {
		return;
	}
	var sql = "INSERT INTO chathistory VALUES ('"+dataobj.name+"','"+dataobj.room+"','"+dataobj.text+"',"+dataobj.timestamp+")";
	console.log(sql);
	connection.query(sql, function(err, result) {
	    if (err) throw err;
	    console.log("1 record inserted");
	});
	connection.end();
}