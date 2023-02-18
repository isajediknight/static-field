
const https = require("https");
const express = require('express');

// Colored Text Constants
const ColoredText = require('./classes/coloredtext');
const BLUE = new ColoredText('Tableau 10 Blue',31,119,180);
const LIGHT_GREEN = new ColoredText('Tableau 20 Light Green',152,223,138);
const BROWN = new ColoredText('Tableau 20 Brown',140,86,75);
const GREY = new ColoredText('Tableau 20 Grey',199,199,199);
const LIGHT_BLUE = new ColoredText('Tableau 20 Light Blue',174,199,232);
const RED = new ColoredText('Tableau 20 Red',214,39,40);
const LIGHT_BROWN = new ColoredText('Tableau 20 Light Brown',196,156,148);
const YELLOW = new ColoredText('Tableau 20 Yellow',188,189,34);
const ORANGE = new ColoredText('Tableau 20 Orange',255,127,14);
const LIGHT_RED = new ColoredText('Tableau 20 Light Red',255,152,150);
const PINK = new ColoredText('Tableau 20 Pink',227,119,194);
const LIGHT_YELLOW = new ColoredText('Tableau 20 Light Yellow',219,219,141);
const LIGHT_ORANGE = new ColoredText('Tableau 20 Light Orange',255,187,120);
const PURPLE = new ColoredText('Tableau 20 Purple',148,103,189);
const LIGHT_PINK = new ColoredText('Tableau 20 Light Pink',247,182,210);
const BABY_BLUE = new ColoredText('Tableau 20 Baby Blue',23,190,207);
const GREEN = new ColoredText('Tableau 20 Green',44,160,44);
const LIGHT_PURPLE = new ColoredText('Tableau 20 Light Purple',197,176,213);
const DARK_GREY = new ColoredText('Tableau 20 Dark Grey',127,127,127);
const LIGHT_BABY_BLUE = new ColoredText('Tableau 20 Light Baby Blue',158,218,229);
console.log('Not Blue ' + BLUE.to_string('This text is Blue'));

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
