import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { SnackBarService } from '../../utility/snack-bar.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_no: "",

  }

  constructor(private authService: AuthenticationService, private _snackBar: SnackBarService) { }

  ngOnInit(): void {
  }
  SignUp() {
    this.authService.SignUp(this.user).subscribe(resp => {
      this._snackBar.openSnackBar('Sign Up Successfully', 'X');
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')

    });

  }


}
