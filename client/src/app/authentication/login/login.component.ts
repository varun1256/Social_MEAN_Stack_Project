import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user={
    email:"",
    password:""
  }
  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
  }
  SignIn(){
  console.log(this.user);
  this.authService.LoggedIn(this.user).subscribe(resp => {
    //   this._snackBar.openSnackBar('User Created.', 'X');
       }, err => {
    //   this._snackBar.openSnackBar(err.error.error, 'X')
    
     });
   
  }
}
