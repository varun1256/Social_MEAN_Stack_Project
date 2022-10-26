import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { SnackBarService } from '../../utility/snack-bar.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  UserList = []
  isListEmpty: Boolean = true;
  displayedCols = ['fname', 'Lname', 'email', 'view'];
  constructor(private userService: UsersService, private _snackBar: SnackBarService) {
    this.userService.List().subscribe(resp => {

      this.UserList = JSON.parse(resp['userList']);
      console.log(this.UserList);
      if (this.UserList.length != 0) {
        this.isListEmpty = false;
        this._snackBar.openSnackBar('User List is Fetched', 'X');
      } else {
        this.isListEmpty = true;
        this._snackBar.openSnackBar('User List is Empty', 'X');
      }
    }, err => {
      this.isListEmpty = true;
      this._snackBar.openSnackBar(err.error.error, 'X')

    });
  }

  ngOnInit(): void {
  }
  sendRequest() {

  }
}
