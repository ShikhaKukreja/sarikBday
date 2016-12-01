
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , multer = require('multer')
  , users = require('./routes/users')
  , mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();
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
app.post('/getGraph', function(req,res){
	console.log(req);
	client.query("SELECT * from `quiz`",function(err,result){
		console.log(err);
		console.log(result);
	var Q1 = [];
	var Q2 = [];
	var Q3 = [];
	 for(var i = 0; i < result.length; i++) {
			 if(result[i].Q1=='May be')
				 Q1[i]=1;
			 else if(result[i].Q1=='Yes, ofcourse!')
				 Q1[i]=2;
			 else if(result[i].Q1=='No')
				 Q1[i]=0;
			 if(result[i].Q2=='Sorry. No comments')
				 Q2[i]=1;
			 else if(result[i].Q2=='Yes she is good at almost everything')
				 Q2[i]=2;
			 else if(result[i].Q2=='No, I dont think so')
				 Q2[i]=0;
			 if(result[i].Q3=='I have virgin lips')
				 Q3[i]=2;
			 else if(result[i].Q3=='I am a woman of words')
				 Q3[i]=2;
			 else if(result[i].Q3=='I am the most mature person in the house')
				 Q3[i]=2;
		    /*Q1[i] = result[i].Q1;
		    Q2[i] = result[i].Q2;
		    Q3[i] = result[i].Q3;*/
		  }
	 jsonArray = [Q1, Q2, Q3];
	 console.log(jsonArray);
	 res.render('index', {jsonArray:jsonArray});
	});
});
app.post('/postFormAngular',function(req,res){
	client.query("INSERT INTO `quiz` (`Q1`,`Q2`,`Q3`) VALUES('"+req.body.question[0]+"','"+req.body.question[1]+"','"+req.body.question[2]+"');",function(err,result){
		if(err) throw err;
	});
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;