var multer = require('multer');
var fs = require('fs');
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
                 callback(null, 'uploadImages');
                  },
    filename: function (req, file, callback) {
                 callback(null, file.originalname);
                 }
           });
var upload = multer({ storage : storage}).single('userPhoto');
exports.uploadImage = function(req,res){
	upload(req,res,function(err){
		console.log(req.files.userPhoto.path);
		fs.readFile(req.files.userPhoto.path, function(err,data){
            var newPath = "/uploadImages/"+req.files.userPhoto.name;
			//var newPath = "C:/Users/shikh/workspace/sbday/public/uploadImages/"+ req.files.userPhoto.name;
            console.log(newPath);
            fs.writeFile(newPath, data, function(err){
            	if(err){
            		return res.end("Error uploading file.");
            	}
            	res.render('index');
            	res.end("File is uploaded");
            })
		});
	});
};
/*exports.dataInsert = function(req,res){
	console.log(req.body);
	console.log("inside function data insert");
};*/
