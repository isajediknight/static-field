
const https = require("https");
const express = require('express');
const app = express();
var fs = require('fs');
var useragent = require('express-useragent');

const menus = ['top','bottom','left','right'];
const top_menu = {Home: "/",Fun: "/fun",UserAgent: "/user-agent",PugTest: "/pug-test"};
const bottom_menu = {PugTest: "/pug-test"};
const left_menu = [];
const right_menu = [];

function print_debug_to_console(req) {
  //console.log(getOs(req.header('User-Agent')))
  console.log(req.url);
  //console.log(JSON.stringify(req.useragent['browser']))
}

// Used to get the Server IP Address for debugging
const ip = require('ip')

// Get absolute path to directory for include statements
directory = __dirname;
folder_str_loc = directory.indexOf('static-field');

// Config the Pug templates
absolute_path_to_pug_views = directory.substring(0,folder_str_loc) + 'static-field/node/content/starting-content/views';
absolute_path_to_certificates = directory.substring(0,folder_str_loc) + 'static-field/node/certificates';

// Setup reusable templates with Pug
app.set('views', absolute_path_to_pug_views);
app.set('view engine', 'pug');

// Favicon
app.use('/favicon.ico', express.static('../themes/default/images/favicon.ico'));

// Styling
// REMINDER add theme logic
app.use('/style.css', express.static('../themes/default/css/style.css'));
app.use('/selected_content_style.css', express.static('../content/starting-content/css/style.css'));

// User Agent Helper
app.use(useragent.express());

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.status(200).render('sample', { title: 'Pug View Test', message: 'Main Page',top_menu_dict: top_menu, bottom_menu_dict: bottom_menu })
  print_debug_to_console(req)
});

app.get('/fun', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.status(200).render('sample', { title: 'Pug View Test', message: 'Pug views work!',top_menu_dict: top_menu, bottom_menu_dict: bottom_menu })
  print_debug_to_console(req)
});


app.get('/user-agent', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.status(200).render('sample', { title: 'Pug View Test', message: req.useragent,top_menu_dict: top_menu, bottom_menu_dict: bottom_menu })
  print_debug_to_console(req)
});

app.get('/pug-test', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.status(200).render('sample', { title: 'Pug View Test', message: 'Pug views work!',top_menu_dict: top_menu, bottom_menu_dict: bottom_menu })
  print_debug_to_console(req)
});

// Catches all pages which don't exist
app.get('*', function(req, res){
  res.set('Content-Type', 'text/html')
  //res.status(404).send('Page Not Found')
  res.status(404).render('sample', { title: 'Page Not Found', message: 'This page does not exist on the server.  Please recheck the URL you are trying to access.',top_menu_dict: top_menu })
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
