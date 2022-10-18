import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  isListEmpty:Boolean=true;
 postList=[]
 limit=2;
  constructor(private postService:PostService) {
    this.postService.list(this.limit).subscribe(resp => {
      //   this._snackBar.openSnackBar('User Created.', 'X');
           this.postList=JSON.parse(resp['postList']);
           console.log(this.postList);
           if(this.postList.length != 0) {
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
   fetch(){
    this.limit=this.limit+2;
    this.postService.list(this.limit).subscribe(resp => {
      //   this._snackBar.openSnackBar('User Created.', 'X');
           this.postList=JSON.parse(resp['postList']);
           console.log(this.postList);
           if(this.postList.length != 0) {
            this.isListEmpty = false;
          } else {
            this.isListEmpty = true;
          }
         }, err => {
          this.isListEmpty = true;
      //   this._snackBar.openSnackBar(err.error.error, 'X')
      
       });
   }
}
