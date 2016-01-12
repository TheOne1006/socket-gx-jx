//app.js

var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
  res.sendFile((__dirname)+'/index.html');
});


var chat = io
  .of('/chat')
  .on('connection', function (socket) {
    socket.emit('getParams', {res:'ttt'});
    socket.on('endend', function (data) {
      console.log(data);
    });
  });

function returnResult () {
	
	var is_success = false;

	return {
		get: function () {
			return is_success;
		},
		set: function (val) {
			is_success = val;
			return is_success;
		}
	};
}

var reObj = returnResult();

var news = io
  .of('/news')
  .on('connection', function (socket) {
   socket.on('endend', function (data) {
   	console.log('返回南昌银行信息');
   	console.log(data);
   	if(data.res){
   	reObj.set(true);
   	}
   });
  });

app.post('/success/:serno', function (req, res) {
	reObj.set(false);
	console.log(req.params.serno);
	console.log(req.body);
	news.emit('getParams', {serno:req.params.serno, postdata: req.body});

	setTimeout(function () {
		if(reObj.get()){
			res.end('success');
		}else{
			res.end('fail');
		}
	},5000);

});


// app.get('/success', function (req, res) {
// 	io.emit('getParams', { hello: 'get' });
// 	res.end('success');
// });



app.use('/bower_components', express.static('./bower_components'));
app.use('/css', express.static('./css'));
app.use('/js', express.static('./js'));


app.set('port', process.env.PORT || 8036);

var server = http.listen(app.get('port'), function() {
  console.log('start at port:' + server.address().port);
});