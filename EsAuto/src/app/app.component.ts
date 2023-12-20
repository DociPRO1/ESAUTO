import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{


  autoSelezionata: any;

  gestisciAccessoRiuscito() {
    this.mostraAuto = true;
    this.mostraLoginComponent = false;
  }

  mostraDettagliAuto(auto: any) {
    this.autoSelezionata = auto;
  }

  mostraAuto = false;
  mostraLoginComponent = true;


  toggleLoginRegistrazione() {
    this.mostraLoginComponent = !this.mostraLoginComponent;
  }


  compra(autoSelezionata: any) {
    fetch('http://localhost:1337/inserisci', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(autoSelezionata),
    })
        .then(response => response.json())
        .then(json => {
          console.log('Data sent successfully:', json);
          // Puoi anche chiamare fetchData() qui per aggiornare i dati dopo l'invio
        })
        .catch(err => console.error("Request failed: ", err));

  }
}
