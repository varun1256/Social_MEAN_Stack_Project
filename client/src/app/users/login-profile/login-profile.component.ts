import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { SnackBarService } from '../../utility/snack-bar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-profile',
  templateUrl: './login-profile.component.html',
  styleUrls: ['./login-profile.component.scss']
})
export class LoginProfileComponent implements OnInit {
  user = {
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_no: '',
    filePath:'',
    friends: []
  }
  url=environment.apiUrl
  showpost = false;
  showsetting = false;
  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute, private _snackBar: SnackBarService) {
    this.route.params.subscribe(params => {
      this.usersService.loginProfile().subscribe(resp => {
        this.user = resp['user'];
        this._snackBar.openSnackBar("Login profile fetched Successfully", "X");
      }, err => {
        this._snackBar.openSnackBar("Login profile not available", "X");
      });
    });
  }

  ngOnInit(): void {
  }
  showPost() {
    this.showpost = !this.showpost
  }
  showSetting() {
    this.showsetting = !this.showsetting
  }
}
