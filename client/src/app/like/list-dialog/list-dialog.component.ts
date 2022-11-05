import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.scss']
})
export class ListDialogComponent implements OnInit {
   url=environment.apiUrl
  constructor( public dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any ) {
     console.log(data);
     }

  ngOnInit(): void {
  
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
