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
    if (this.registrazioneForm.valid) {
      console.log(this.registrazioneForm.value);
    }
  }
  logFormState() {
    console.log(this.registrazioneForm.value );
  }


}
