import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { RegistratiComponent } from './registrati/registrati.component';
import { AutoComponent } from './auto/auto.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistratiComponent,
    AutoComponent,
  ],
  imports: [
    BrowserModule,
    JsonPipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    JsonPipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
