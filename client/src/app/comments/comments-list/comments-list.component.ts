import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../comment.service';
import { SnackBarService } from '../../utility/snack-bar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  @Input() post_id
  isListEmpty: Boolean = true;
  commentList = []
  limit = 2;
  showComments: Boolean = false;
  url=environment.apiUrl;
  constructor(private commentsService: CommentService, private _snackBar: SnackBarService) { }

  ngOnInit(): void {
  }
  show() {
    this.showComments = !this.showComments;
    this.commentsService.list(this.limit, this.post_id).subscribe(resp => {

      this.commentList = JSON.parse(resp['commentsList']);
      console.log(this.commentList);
      if (this.commentList.length != 0) {
        this.isListEmpty = false;
       
      } else {
        this.isListEmpty = true;
        this._snackBar.openSnackBar('No Comments', 'X');
      }
    }, err => {
      this.isListEmpty = true;
      this._snackBar.openSnackBar(err.error.error, 'X')

    });
  }
  showMore() {
    this.limit = this.limit + 2;
    this.commentsService.list(this.limit, this.post_id).subscribe(resp => {
        
      this.commentList = JSON.parse(resp['commentsList']);
      console.log(this.commentList);
      if (this.commentList.length != 0) {
        this.isListEmpty = false;
      } else {
        this.isListEmpty = true;
      }
    }, err => {
      this.isListEmpty = true;
       this._snackBar.openSnackBar(err.error.error, 'X')

    });

  }
  deleteComment(id) {
    this.commentsService.removeComment(this.post_id,id).subscribe(resp => {
      this._snackBar.openSnackBar('Comment is Deleted', 'X');
      this.show();
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')
    });
    
   
  }

}
