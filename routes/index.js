var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

const visualRecognition = new VisualRecognitionV3({
  // Set the endpoint
  url: 'https://gateway.watsonplatform.net/visual-recognition/api',
  version: '2018-03-19',
  iam_apikey: '7mHswLxu6mC5bEg8fPeEJ8S2d-1BLReUDN7LS7zf4R8H'
});

/* GET home page. */
router.get('/', function(req, res, next){
	res.render('initial', { title: 'Submit File' });
});

router.post('/fileupload', function(req, res, next) {
  var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

      var images_file = fs.createReadStream(files.filetoupload.path);

      var params = {
      	      images_file: images_file
      };

      visualRecognition.detectFaces(params, function(err, response) {
	      if (err)
	      console.log(err);
	      else
        res.render('results', { title: 'Results of Facial Recognition', result: "Age Range: "+response.images[0].faces[0].age.min+" - "+response.images[0].faces[0].age.max , result2: "Gender: "+response.images[0].faces[0].gender.gender });
 	      console.log(JSON.stringify(response, null, 2));
      });
    });
});

module.exports = router;
