/**
 * http://usejsdoc.org/
 */
function getConnection(){
var mysql = require('mysql');
var client = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'sbday'
});
client.connect(function(err){
	if(err) {
		console.error('Error connecting: '+err.stack);
		return;
	}
	console.log('Connected!!');
});
return client;
}
