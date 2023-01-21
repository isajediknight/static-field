// Importing the http module
const http = require("http")

// Creating server
const server = http.createServer((req, res) => {
	// Sending the response
	res.write("Your First server!")

	//const parseIp = (req) =>
	//req.headers['x-forwarded-for']?.split(',').shift()
    //|| req.socket?.remoteAddress
    //console.log(parseIp(req))

    //console.log(req.headers)
    terrible = JSON.stringify(JSON.parse(req), null, 2)[0];
    //terrible = JSON.stringify(JSON.parse(req), null, "  ")
    console.log(terrible);
    //console.log("Original uri object:", http.request.uri);

	res.end();
})

// Server listening to port 3000
server.listen((3000), () => {
	console.log("Server is Running");
})
