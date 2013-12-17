var express = require('express');
var app = express();
var fs = require('fs');

fs.readFile('./html/index.html',function(e,data) {
	console.log('File content: '+data);
});

app.get('/:id?',function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	if(req.params.id){
		//res.send(req.params.id);
		fs.readFile('html/'+req.params.id,function(e,data) {
			res.write(data);
		});
	} else {
		res.write('html/index.html');
	}
});
console.log("nodejs route start");

app.listen(8124);
