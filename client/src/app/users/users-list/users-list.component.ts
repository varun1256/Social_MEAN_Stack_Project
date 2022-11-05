import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { SnackBarService } from '../../utility/snack-bar.service';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  isListEmpty: Boolean = true;
  displayedCols = ['photo','fname', 'email', 'view'];
  url=environment.apiUrl
  dataSource!:MatTableDataSource<any>
  constructor(private userService: UsersService, private _snackBar: SnackBarService) {
    this.userService.List().subscribe(resp => {
      let List=JSON.parse(resp['userList']);
     this.dataSource=new MatTableDataSource(List)
     console.log(List.length);
     
      if (List.length != 0) {
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
  applyFilter($event:any){
    // const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = $event.target.value;
  }
  ngOnInit(): void {
  }
  sendRequest() {

  }
}
