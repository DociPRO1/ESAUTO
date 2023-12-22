import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  mostraLogin: boolean = true;

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
          alert("Auto comprata con successo")
        })
        .catch(err => console.error("Request failed: ", err));

  }
}
