var express = require('express');
var fs = require('fs');
var index = fs.readFileSync('index.html');

express.createServer(function (request, response) {
response.WriteHead(200,{'Content -Type':'text/plain'}); 
 response.end(index);
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
