import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() accessoRiuscito = new EventEmitter<void>();
  @Output() mostraRegistrati = new EventEmitter<void>();

  switchToRegistrati(): void {
    this.mostraRegistrati.emit();
  }

  private url = "http://localhost:1337/prendi";

  data: any;
  pers: { codiceFiscale: string, mail: string, password: string, confermaPassword: string, cognome: string, nome: string, indirizzo: string }[] = [];

  ngOnInit() {
  fetch("http://localhost:1337/persData")
        .then(response => response.json())
        .then(json => {
          this.pers = json;
          console.log(this.pers)
        })
        .catch(err => console.log("request failed: ", err))
  }

  reactiveForm: FormGroup;
  mail: string = "";

  constructor(private formBuilder: FormBuilder) {
    this.reactiveForm = this.formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      mail: [
        '',
        [
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9-.]+\\.[a-z]{2,}$'),

          Validators.required
        ]
      ]
    });
  }



  sendData() {
    console.log(this.reactiveForm.value)
  }

  accedi() {
    const formValue = this.reactiveForm.value;
    const utenteAutenticato = this.pers.find(user =>
        user.mail === formValue.mail && user.password === formValue.password
    );

    if (utenteAutenticato) {
      // L'utente è autenticato, puoi gestire l'accesso qui
      console.log('Accesso consentito');
    } else {
      // L'utente non è autenticato, puoi gestire il caso qui
      console.log('Credenziali non valide');
    }

    if (utenteAutenticato) {
      this.accessoRiuscito.emit();
    }

  }
}


/*

 private url="http://localhost:1337/prendi";

  data:any;

  ngOnInit() {
    fetch(this.url)
      .then(response=> response.json())
      .then(json=> {
        this.data = json;
        console.log(this.data)
      })
      .catch(err => console.log("request failed: " , err))
  }
 */
