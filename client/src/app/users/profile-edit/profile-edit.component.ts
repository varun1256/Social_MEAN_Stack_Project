import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { SnackBarService } from '../../utility/snack-bar.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  user = {
    first_name: "",
    last_name: "",
    phone_no: ""
  }
  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute, private _snackBar: SnackBarService) {
    this.route.params.subscribe(params => {
      this.usersService.loginProfile().subscribe(resp => {
        this.user = resp['user'];
        console.log(this.user);
        this._snackBar.openSnackBar("User profile fetched Successfully", "X");
      }, err => {
        this._snackBar.openSnackBar("User profile not available", "X");
      });
    });
  }

  ngOnInit(): void {
  }

  edit() {
    this.usersService.editUser(this.user).subscribe(resp => {
      this.user = resp['user'];
      console.log(this.user);
      this._snackBar.openSnackBar("User profile Edit Successfully", "X");
    }, err => {
      this._snackBar.openSnackBar(err.error.error, "X");
    });
  }
}
