
'use strict'

const http = require('http');
const url = require('url');

const fs = require('fs');

const port = 1337;

let server = http.createServer((richiesta, res) => {
  let indirizzo = richiesta.headers.host + richiesta.url;
  let infoUrl = url.parse(indirizzo, true);

  console.log(infoUrl.pathname);
  let header = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  switch(infoUrl.pathname){

    case '/prendi':

      fs.readFile('auto.json', (err, data) => {

        res.writeHead(200, header
        );

        res.end(data);

      });
      break;
    case '/persData':

      fs.readFile('persone.json', (err, data) => {

        res.writeHead(200, header
        );

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
            res.writeHead(200, header);
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
function salvaDatiSuFile(nomeFile, nuoviDati) {
  // Leggi i dati esistenti dal file
  fs.readFile(nomeFile, (err, data) => {
    if (err) {
      console.error('Errore durante la lettura dei dati dal file:', err);
      return;
    }

    let datiEsistenti = [];
    try {
      // Converte i dati esistenti in un array
      datiEsistenti = JSON.parse(data);
    } catch (error) {
      console.error('Errore nel parsing dei dati esistenti:', error);
      return;
    }

    // Aggiungi i nuovi dati all'array esistente
    datiEsistenti.push(nuoviDati);

    // Scrivi l'array aggiornato nel file
    fs.writeFile(nomeFile, JSON.stringify(datiEsistenti), (err) => {
      if (err) {
        console.error('Errore durante il salvataggio dei dati su file:', err);
      } else {
        console.log('Dati aggiunti con successo a:', nomeFile);
      }
    });
  });
}

server.listen(port);
console.log('il server è avviato sulla porta: ' + port);


