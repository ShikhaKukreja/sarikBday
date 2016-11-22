var multer = require('multer');
var fs = require('fs');
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
                 callback(null, '/uploadImages/');
                  },
    filename: function (req, file, callback) {
                 callback(null, file.originalname);
                 }
           });
var upload = multer({ storage : storage}).single('userPhoto');
exports.uploadImage = function(req,res){
	upload(req,res,function(err){
		console.log(req.file);
		/*fs.readFile(req.file.image.path, function(err,data){
			var dirname = "public/uploadImages/";
            var newPath = dirname + req.body.filename;
            fs.writeFile(newPath, data, function(err){
            	if(err){
            		return res.end("Error uploading file.");
            	}
            	res.end("File is uploaded");
            })
		});*/
	});
};
