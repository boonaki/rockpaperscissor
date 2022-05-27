//server
const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('rock' in params){
      if(params['']== 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        let handSignNum = Math.ceil(Math.random() * 3);
        	switch(handSignNum){
          	case 1:
            	handSigns = 'scissors'
            	break;
            case 2:
            	handSigns = 'rock'
              break;
            case 3:
            	handSigns = 'paper'
              break;
          };
          
           let key = {
    rock: {
      scissors: true,
      paper: false,
      rock: 'tie',
    },
    paper: {
      scissors: false,
      paper: 'tie',
      rock: true,
    },
    scissors: {
      scissors: 'tie',
      paper: true,
      rock: false,
    },
  };
          const objToJson = {
          	compRes : handSigns
          }
        res.end(JSON.stringify(objToJson));
      }
    }//student if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);