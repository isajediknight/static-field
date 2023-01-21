const express = require('express')
const app = express()

function print_debug_to_console(req) {
  console.log(req.header('User-Agent'))
  console.log(req.url)
}

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

app.get('*', function(req, res){
  res.set('Content-Type', 'text/html')
  res.status(404).send('Page Not Found')
  print_debug_to_console(req)
});

app.listen(3000, () => {
  console.log('Server ready')
});
