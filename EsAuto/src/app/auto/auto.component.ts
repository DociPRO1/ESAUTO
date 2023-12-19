import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit{

    @Output() mostraDettagli = new EventEmitter<any>();

    onCardClick(auto: any) {
        this.mostraDettagli.emit(auto);
        console.log(auto)
    }
  private url = "http://localhost:1337/prendi";

  data: any;

  ngOnInit() {
    fetch(this.url)
        .then(response => response.json())
        .then(json => {
          this.data = json;
          console.log(this.data)
        })
        .catch(err => console.log("request failed: ", err))
  }

}
