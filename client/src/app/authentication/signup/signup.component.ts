import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
//import { SnackBarService } from 'src/app/utility/snackbar/snackbar.component';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user={
    first_name:"" ,
    last_name: "",
    email: "",
    password:"",
    phone_no:"",
    
  }

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
  }
  SignUp(){
    this.authService.SignUp(this.user).subscribe(resp => {
 //   this._snackBar.openSnackBar('User Created.', 'X');
    }, err => {
 //   this._snackBar.openSnackBar(err.error.error, 'X')
 
  });

  }


}
