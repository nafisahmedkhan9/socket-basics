var mysql = require('mysql');
var PORT = process.env.PORT || 3308 ;
exports.insertfunc = function(dataobj){
	var connection = mysql.createConnection({
		host: '',
		port: PORT,
		user: '',
		password: '',
		database: ''
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