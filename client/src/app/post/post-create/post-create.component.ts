import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  post={
    content:""
  }
  constructor(private postService:PostService) { }

  ngOnInit(): void {
  }
 postForm(){
  this.postService.create(this.post).subscribe(resp => {
    //   this._snackBar.openSnackBar('User Created.', 'X');
       }, err => {
    //   this._snackBar.openSnackBar(err.error.error, 'X')
    
     });
 }
}
