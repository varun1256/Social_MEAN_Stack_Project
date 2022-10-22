import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login-profile',
  templateUrl: './login-profile.component.html',
  styleUrls: ['./login-profile.component.scss']
})
export class LoginProfileComponent implements OnInit {
  user={
    first_name:'',
    last_name:'',
    email:'',
    phone_no:'',
    friends:[]
 }
 showpost=false;
  constructor(private usersService:UsersService,private router: Router, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.usersService.loginProfile().subscribe(resp => {
           this.user=resp['user'];
         
      //   this._snackBar.openSnackBar("User profile fetched Successfully", "X");
           }, err => {
          //  this._snackBar.openSnackBar("User profile not available", "X");
          });
    });
  }

  ngOnInit(): void {
  }
  showPost(){
    this.showpost=!this.showpost
  }
}
