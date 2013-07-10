//var buffer = new Buffer(100);
//buffer=fs.readFileSync('index.html');
//console.log(buffer.toString('utf8',0,buffer.length);
var text = fs.readFileSync('index.html','utf8');
console.log(text);


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
