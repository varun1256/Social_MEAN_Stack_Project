import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { SnackBarService } from '../../utility/snack-bar.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent implements OnInit {
  user = {
    first_name: '',
    last_name: '',
    email: '',
    phone_no: '',
    filePath:'',
    friends: []
  }
  url=environment.apiUrl
  showpost = false;
  relation: boolean
  self: boolean
  sent: boolean
  requested: boolean
  us = {
    id: ""
  }
  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute, private _snackBar: SnackBarService) {
    this.route.params.subscribe(params => {
      this.usersService.getProfile(params['id']).subscribe(resp => {
        this.user = resp['user'];
        this.relation = resp['relation'];
        this.self = resp['self'];
        this.sent = resp['sent'];
        this.requested = resp['reqsted'];
        console.log(this.requested);
        this._snackBar.openSnackBar("User profile fetched Successfully", "X");
      }, err => {
        this._snackBar.openSnackBar("User profile not available", "X");
      });
    });
  }

  ngOnInit(): void {
  }
  sendRequest() {
    this.route.params.subscribe(params => {
      this.us.id = params['id'];
      this.usersService.RequestSend(this.us).subscribe(resp => {
        this._snackBar.openSnackBar("Request Send Successfully", "X");
        window.location.reload();
      }, err => {
        this._snackBar.openSnackBar(err.error.error, "X");
      });
    });



  }
  showPost() {
    this.showpost = !this.showpost
  }

}
