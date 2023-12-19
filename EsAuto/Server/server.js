
'use strict'

const http = require('http');
const url = require('url');

const fs = require('fs');

const port = 1337;

let server = http.createServer((richiesta, res) => {
  let indirizzo = richiesta.headers.host + richiesta.url;
  let infoUrl = url.parse(indirizzo, true);

  console.log(infoUrl.pathname);

  switch(infoUrl.pathname){

    case '/prendi':

      fs.readFile('auto.json', (err, data) => {

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });

        res.end(data);

      });
      break;

    case '/registrati':

      if (richiesta.method === 'POST') {
        let body = '';

        richiesta.on('data', (chunk) => {
          body += chunk;
        });

        richiesta.on('end', () => {
          try {
            const dati = JSON.parse(body);
            salvaDatiSuFile('persone.json', dati);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Errore nel parsing JSON' }));
          }
        });
      } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Metodo non consentito' }));
      }
      break;


    default:
      infoUrl.pathname = infoUrl.pathname.replace('/', '');

      if(infoUrl.pathname.includes('.html'))
        fs.readFile(infoUrl.pathname, (err, file) => { inviaFile(err, file, risposta, 'text/html'); });

      else if (infoUrl.pathname.includes('.css'))
        fs.readFile(infoUrl.pathname, (err, file) => { inviaFile(err, file, risposta, 'text/css'); });

      else if (infoUrl.pathname.includes('.js'))
        fs.readFile(infoUrl.pathname, (err, file) => { inviaFile(err, file, risposta, 'text/javascript'); });
      break;
  }
});
function salvaDatiSuFile(nomeFile, dati) {
  fs.writeFile(nomeFile, JSON.stringify(dati), (err) => {
    if (err) {
      console.error('Errore durante il salvataggio dei dati su file:', err);
    } else {
      console.log('Dati salvati con successo su file:', nomeFile);
    }
  });
}


server.listen(port);
console.log('il server è avviato sulla porta: ' + port);


