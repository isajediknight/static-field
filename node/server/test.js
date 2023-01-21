var http = require('http');

var server = http.createServer(function (req, res) {
  req.on('data', function (chunk) {
    console.log("Chuck: ", chunk);
  });
  req.on('end', function () {
    console.log("End of Request");
    res.end('yay');
  });
}).listen(3000);