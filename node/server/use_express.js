const express = require('express')
var fs = require('fs');
const app = express()
var useragent = require('express-useragent');


function print_debug_to_console(req) {
  //console.log(getOs(req.header('User-Agent')))
  console.log(req.url)
  //console.log(JSON.stringify(req.useragent['browser']))
}

const ip = require('ip')



console.log(" Local Server IP Address: " + ip.address())

app.set('views', 'views');
app.set('view engine', 'pug');

// Favicon
app.use('/favicon.ico', express.static('../images/favicon.ico'));
// User Agent Helper
app.use(useragent.express());


app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.send('Main Page')
  //console.log(req.query)
  //console.log(req.header('User-Agent'))
  //console.log(req.url)
  print_debug_to_console(req)
});

app.get('/fun', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.send('We are having fun!')
  print_debug_to_console(req)
});


app.get('/show-user-agent', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.send(req.useragent);
  print_debug_to_console(req)
});

app.get('*', function(req, res){
  res.set('Content-Type', 'text/html')
  res.status(404).send('Page Not Found')
  print_debug_to_console(req)
});

app.listen(80, () => {
  console.log('Server ready')
});
