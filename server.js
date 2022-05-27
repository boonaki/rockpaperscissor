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
    const gameSet = ['rock', 'paper', 'scissors'];
    if('pick' in params){
      if(gameSet.includes(params['pick'])){
        res.writeHead(200, {'Content-Type': 'application/json'});
        //decides computer answer
        let handSignNum = Math.ceil(Math.random() * 3);
        //create obj to compare comp ans / user ans
        const gameKey = {
          rock: {
            scissors: 'You win!',
            paper: 'You lose...',
            rock: 'tie',
          },
          paper: {
            scissors: 'You lose...',
            paper: 'tie',
            rock: 'You win!',
          },
          scissors: {
            scissors: 'tie',
            paper: 'You win!',
            rock: 'You lose...',
          },
        };
        
        // let handSigns = handSignNum === 1 ? 'rock': handSignNum === 2 ? 'paper' : 'scissors';
        let handSigns;
        switch(handSignNum){
        case 1:
            handSigns = gameKey['rock'][params['pick']]
            break;
        case 2:
            handSigns = gameKey['paper'][params['pick']]
          break;
        case 3:
            handSigns = gameKey['scissors'][params['pick']]
          break;
          };
           // ls
          const objToJson = {
            // example: rock vs paper = false meaning player 1 lost
          	gameRes : handSigns
          }
        res.end(JSON.stringify(objToJson));
      }
    }
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

//contributors
//deijnutz(she/they)#7606
//Nepwright#9711
//yoda300100#9626
//M!RE5
//cmite#0663
//Kohai#8637 (@MainlyColors)
//<3
