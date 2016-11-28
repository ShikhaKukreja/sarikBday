
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , session=require('client-sessions')
  , multer = require('multer')
  , users = require('./routes/users')
  , mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();

app.use(session({
	cookieName: 'session',
	secret: 'sessions_example',
	duration: 30*60*1000,
	activeduration: 5*60*1000,
}));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: false}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.bodyParser({keepExtensions: true, uploadDir: __dirname+'/public/uploadImages'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, '\public')));
var client = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	port: '3306',
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
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/uploadImage',users.uploadImage);
app.post('/postFormAngular',function(req,res){
	client.query("INSERT INTO `quiz` (`Q1`,`Q2`,`Q3`) VALUES('"+req.body.question[0]+"','"+req.body.question[1]+"','"+req.body.question[2]+"');",function(err,result){
		if(err) throw err;
		client.end();
	});
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
