import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { SnackBarService } from '../../utility/snack-bar.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  requestList=[]
   isListEmpty:Boolean=true;
   displayedCols = ['photo','fname', 'Lname', 'email','view','accept','reject'];
  constructor(private requestService:RequestService,private _snackBar:SnackBarService) {
    this.requestService.List().subscribe(resp => {
       
           this.requestList=JSON.parse(resp['requestList']);
           console.log(this.requestList);
           if(this.requestList.length != 0) {
            this.isListEmpty = false;
            this._snackBar.openSnackBar('Request List Fetched', 'X');
          } else {
            this.isListEmpty = true;
            this._snackBar.openSnackBar('Request List is Empty', 'X');
          }
         }, err => {
          this.isListEmpty = true;
         this._snackBar.openSnackBar(err.error.error, 'X')
      
       });
   }


  ngOnInit(): void {
  }
 accept(id){
  this.requestService.RequestAccept(id).subscribe(resp => {
      this._snackBar.openSnackBar('Accepted', 'X');
        window.location.reload();
        if(this.requestList.length != 0) {
          this.isListEmpty = false;
        } else {
          this.isListEmpty = true;
        }
       }, err => {
        this.isListEmpty = true;
      this._snackBar.openSnackBar(err.error.error, 'X')
    
     });

 }
 reject(id){
  console.log(id);
  this.requestService.RequestReject(id).subscribe(resp => {
       this._snackBar.openSnackBar('Rejected', 'X');
        window.location.reload();
        if(this.requestList.length != 0) {
          this.isListEmpty = false;
        } else {
          this.isListEmpty = true;
        }
       }, err => {
        this.isListEmpty = true;
     this._snackBar.openSnackBar(err.error.error, 'X')
    
     });

 }


}
