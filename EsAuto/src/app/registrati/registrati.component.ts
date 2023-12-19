import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'registrati',
  templateUrl: './registrati.component.html',
  styleUrls: ['./registrati.component.css']
})
export class RegistratiComponent implements OnInit{
  registrazioneForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registrazioneForm = this.formBuilder.group({
      codiceFiscale: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confermaPassword: ['', [Validators.required, this.passwordMatchValidator]],
      cognome: ['', [Validators.required, Validators.minLength(2)]],
      nome: ['', [Validators.required, Validators.minLength(2)]],
      indirizzo: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confermaPassword = control.get('confermaPassword');

    if (!password || !confermaPassword) {
      return null;
    }

    return password.value === confermaPassword.value ? null : { 'mismatch': true };
  }

  inviaDatiRegistrazione() {


      fetch('http://localhost:1337/registrati', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(this.registrazioneForm.value),
      })
          .then(response => response.json())
          .then(json => {
            console.log('Data sent successfully:', json);
            // Puoi anche chiamare fetchData() qui per aggiornare i dati dopo l'invio
          })
          .catch(err => console.error("Request failed: ", err));
  }
  logFormState() {
    console.log(this.registrazioneForm.value );
  }


}
