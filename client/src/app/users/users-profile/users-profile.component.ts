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
    phone_no:'',
    friends:[]
 }
 relation:boolean
 self:boolean
 us={
  id:""
 }
  constructor(private usersService:UsersService,private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.usersService.getProfile(params['id']).subscribe(resp => {
           this.user=resp['user'];
           this.relation=resp['relation'];
           this.self=resp['self'];
            console.log(this.self);
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
