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
    email: '',
    password:''
  }
  otp
  userOTP
  showotp = false;
  resetpassword=false;
  constructor(private authService: AuthenticationService, private _snackBar: SnackBarService) { }

  ngOnInit(): void {
  }
  verifyEmail() {
    this.authService.checkEmail(this.user).subscribe(resp => {
      this._snackBar.openSnackBar('Email Verified', 'X');
      this.showotp = resp['displayotp'];
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')

    });

  }
  sendotp() {
    this.authService.sendOTP(this.user).subscribe(resp => {
      this._snackBar.openSnackBar('OTP send ', 'X')
      this.otp = resp['OTP'];
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')

    });

  }
 verifyotp(){
  if(this.otp==this.userOTP){
       this.resetpassword=true;
  }
  else{
    this._snackBar.openSnackBar('Wrong OTP', 'X')
  }
 }

 reset(){
  this.authService.resetPassword(this.user).subscribe(resp => {
    this._snackBar.openSnackBar('Password is reset ', 'X');

  }, err => {
    this._snackBar.openSnackBar(err.error.error, 'X')

  });

 }
 sendotpMail() {
  this.authService.sendOTPMail(this.user).subscribe(resp => {
    this._snackBar.openSnackBar('OTP send ', 'X')
    this.otp = resp['OTP'];
  }, err => {
    this._snackBar.openSnackBar(err.error.error, 'X')

  });

}

}
