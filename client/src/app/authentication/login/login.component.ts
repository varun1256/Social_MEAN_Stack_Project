import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { SnackBarService } from '../../utility/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    email: "",
    password: ""
  }
  constructor(private authService: AuthenticationService, private _snackBar: SnackBarService) { }

  ngOnInit(): void {
  }
  SignIn() {
    console.log(this.user);
    this.authService.LoggedIn(this.user).subscribe(resp => {
      this._snackBar.openSnackBar('Logged In Successfully', 'X');
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')

    });

  }
}
