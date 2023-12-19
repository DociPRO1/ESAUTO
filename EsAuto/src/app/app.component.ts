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
}
