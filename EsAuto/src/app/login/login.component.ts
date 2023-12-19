import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
