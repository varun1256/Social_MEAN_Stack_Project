import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent implements OnInit {
  user={
    first_name:'',
    last_name:'',
    email:'',
    phone_no:''
 }
 us={
  id:""
 }
  constructor(private usersService:UsersService,private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.usersService.getProfile(params['id']).subscribe(resp => {
           this.user=resp['user'];
      //   this._snackBar.openSnackBar("User profile fetched Successfully", "X");
           }, err => {
          //  this._snackBar.openSnackBar("User profile not available", "X");
          });
    });
   }

  ngOnInit(): void {
  }
   sendRequest(){
    this.route.params.subscribe(params => {
      this.us.id=params['id'];
      this.usersService.RequestSend(this.us).subscribe(resp => {
           //this.user=resp['user'];
      //   this._snackBar.openSnackBar("User profile fetched Successfully", "X");
           }, err => {
          //  this._snackBar.openSnackBar("User profile not available", "X");
          });
    });



   }
}
