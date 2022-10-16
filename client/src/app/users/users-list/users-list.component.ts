import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
   UserList=[]
   isListEmpty:Boolean=true;
   displayedCols = ['fname', 'Lname', 'email'];
  constructor(private userService:UsersService) { 
    this.userService.List().subscribe(resp => {
      //   this._snackBar.openSnackBar('User Created.', 'X');
           this.UserList=JSON.parse(resp['userList']);
           console.log(this.UserList);
           if(this.UserList.length != 0) {
            this.isListEmpty = false;
          } else {
            this.isListEmpty = true;
          }
         }, err => {
          this.isListEmpty = true;
      //   this._snackBar.openSnackBar(err.error.error, 'X')
      
       });
  }

  ngOnInit(): void {
  }
 
}
