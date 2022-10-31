import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignupComponent } from './signup/signup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
   
  ],
  providers:[
    AuthenticationService
  ]
})
export class AuthenticationModule { }
