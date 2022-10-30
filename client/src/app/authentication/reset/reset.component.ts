import { Component, OnInit } from '@angular/core';
import { SnackBarService } from 'src/app/utility/snack-bar.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  user = {
    email: ''
  }
  otp
  showotp = false;
  constructor(private authService: AuthenticationService, private _snackBar: SnackBarService) { }

  ngOnInit(): void {
  }
  verifyEmail() {
    this.authService.checkEmail(this.user).subscribe(resp => {
      this._snackBar.openSnackBar('Email Verified', 'X');
      this.showotp = resp['displayotp'];
      console.log(this.showotp);
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')

    });

  }
  sendotp() {
    this.authService.sendOTP(this.user).subscribe(resp => {
      this._snackBar.openSnackBar('OTP send ', 'X')
      this.otp = resp['OTP'];
      console.log(this.otp);
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')

    });

  }


}
