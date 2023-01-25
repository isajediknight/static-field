
const https = require("https");
const express = require('express');
const app = express();
var fs = require('fs');
var useragent = require('express-useragent');

function print_debug_to_console(req) {
  //console.log(getOs(req.header('User-Agent')))
  console.log(req.url);
  //console.log(JSON.stringify(req.useragent['browser']))
}

const ip = require('ip')

// Get absolute path to directory
directory = __dirname;
folder_str_loc = directory.indexOf('static-field');
absolute_path_to_pug_views = directory.substring(0,folder_str_loc) + 'static-field/node/themes/default/views';
absolute_path_to_certificates = directory.substring(0,folder_str_loc) + 'static-field/node/certificates';

// Setup reusable templates with Pug
app.set('views', absolute_path_to_pug_views);
app.set('view engine', 'pug');

// Favicon
app.use('/favicon.ico', express.static('../themes/default/images/favicon.ico'));
// User Agent Helper
app.use(useragent.express());

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.status(200).send('Main Page')
  //console.log(req.query)
  //console.log(req.header('User-Agent'))
  //console.log(req.url)
  print_debug_to_console(req)
});

app.get('/fun', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.status(200).send('We are having fun!')
  print_debug_to_console(req)
});


app.get('/show-user-agent', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.status(200).send(req.useragent)
  print_debug_to_console(req)
});

app.get('/pug-test', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.status(200).render('index', { title: 'Hey', message: 'Hello there!' })
  print_debug_to_console(req)
});

// Catches all pages which don't exist
app.get('*', function(req, res){
  res.set('Content-Type', 'text/html')
  res.status(404).send('Page Not Found')
  print_debug_to_console(req)
});

const PORT = 4000;
// https Server
https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync(absolute_path_to_certificates + "/key.pem"),
      cert: fs.readFileSync(absolute_path_to_certificates + "/cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log('Server ready: ' + ip.address() + ':' + PORT.toString());
  });

// http Server
//app.listen(PORT, () => {
//  console.log('Server ready: ' + ip.address() + ':' + PORT.toString())
//});
