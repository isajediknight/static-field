
const https = require("https");
const express = require('express');
const app = express();
var fs = require('fs');
var useragent = require('express-useragent');

// Menus
const menus = ['top','bottom','left','right'];
const top_menu = {Top: "/top"};
const bottom_menu = {Bottom: "/bottom"};
const left_menu = {Left: "/left"};
const right_menu = {right: "/right"};

// Content
style_page_name = "";
left_content = "Left Content"
middle_content = "Middle Content"
right_content = "Right Content"

function print_debug_to_console(req) {
  //console.log(getOs(req.header('User-Agent')))
  console.log(decodeURI(req.url));
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
  style_page_name = "page-home"
  res.set('Content-Type', 'text/html')
  res.status(200).render('sample', {title: 'Pug View Test',
                                    message: 'Home Page',
                                    top_menu,
                                    bottom_menu,
                                    left_menu,
                                    right_menu,
                                    right_content,
                                    middle_content,
                                    left_content,
                                    style_page_name
                                   })
  print_debug_to_console(req)
});

app.get('/fun', (req, res) => {
  style_page_name = "page-fun"
  res.set('Content-Type', 'text/html')
  res.status(200).render('sample', {title: 'Pug View Test',
                                    message: 'Pug views work!',
                                    top_menu,
                                    bottom_menu,
                                    left_menu,
                                    right_menu,
                                    right_content,
                                    middle_content,
                                    left_content,
                                    style_page_name
                                   })
  print_debug_to_console(req)
});


app.get('/user-agent', (req, res) => {
  style_page_name = "page-user-agent"
  res.set('Content-Type', 'text/html')
  res.status(200).render('sample', {title: 'Pug View Test',
                                    message: req.useragent,
                                    top_menu,
                                    bottom_menu,
                                    left_menu,
                                    right_menu,
                                    right_content,
                                    middle_content,
                                    left_content,
                                    style_page_name
                                   })
  print_debug_to_console(req)
});

app.get('/pug-test', (req, res) => {
  style_page_name = "page-pug-test"
  res.set('Content-Type', 'text/html')
  res.status(200).render('sample', { title: 'Pug View Test',
                                    message: 'Pug views work!',
                                    top_menu,
                                    bottom_menu,
                                    left_menu,
                                    right_menu,
                                    right_content,
                                    middle_content,
                                    left_content,
                                    style_page_name
                                   })
  print_debug_to_console(req)
});

app.get('/page/*', (req, res) => {
  //.indexOf('static-field')
  page_name = decodeURI(req.url.substring(6,req.url.length))
  style_page_name = "page-page-" + page_name.replace(' ','-')
  res.set('Content-Type', 'text/html')
  res.status(200).render('sample', { title: 'Page',
                                    message: page_name,
                                    top_menu,
                                    bottom_menu,
                                    left_menu,
                                    right_menu,
                                    right_content,
                                    middle_content,
                                    left_content,
                                    style_page_name
                                   })
  print_debug_to_console(req)
});

// Catches all pages which don't exist
app.get('*', function(req, res){
  style_page_name = "page-page-not-found"
  res.set('Content-Type', 'text/html')
  //res.status(404).send('Page Not Found')
  res.status(404).render('sample', {title: 'Page Not Found',
                                    message: 'This page does not exist on the server.  Please recheck the URL you are trying to access.',
                                    top_menu,
                                    bottom_menu,
                                    left_menu,
                                    right_menu,
                                    right_content,
                                    middle_content,
                                    left_content,
                                    style_page_name
                                   })
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
