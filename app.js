var app = require('http').createServer(httpServer)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(2333);

function httpServer (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
	    res.end(data)
        });
}
////fix time zone 
function fixtimes (){
    var utctimes = new Date ()
    var times = utctimes.getTime()  + 0
    var times = new Date (times)
    times = times.toLocaleString();
    return times;
}

io.on('connection', function (socket) {
    socket.emit('news', {times:fixtimes(),nick:'System',words:'Welcome ! Have fun!'});
    socket.on('sends', function (data) {
       data.times = fixtimes()
       console.log(data)
       socket.broadcast.emit('news',data)
    });
});
