import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../friends.service';
import { SnackBarService } from '../../utility/snack-bar.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  FriendsList = []
  isListEmpty: Boolean = true;
  displayedCols = ['fname', 'Lname', 'email', 'view', 'unfriend'];

  constructor(private friendsService: FriendsService, private _snackBar: SnackBarService) {
    this.friendsService.List().subscribe(resp => {
      this.FriendsList = JSON.parse(resp['friendsList']);
      console.log(this.FriendsList);
      if (this.FriendsList.length != 0) {
        this.isListEmpty = false;
        this._snackBar.openSnackBar('Friend List Fetched', 'X');
      } else {
        this.isListEmpty = true;
        this._snackBar.openSnackBar('Friend List is Empty', 'X');
      }
    }, err => {
      this.isListEmpty = true;
      this._snackBar.openSnackBar(err.error.error, 'X')

    });
  }
  UnFriend(id) {
    console.log(id);
    this.friendsService.Unfriend(id).subscribe(resp => {
      this._snackBar.openSnackBar('Unfriended Successfully', 'X');
      window.location.reload();
      if (this.FriendsList.length != 0) {
        this.isListEmpty = false;
      } else {
        this.isListEmpty = true;
      }
    }, err => {
      this.isListEmpty = true;
      this._snackBar.openSnackBar(err.error.error, 'X')

    });

  }

  ngOnInit(): void {
  }


}
