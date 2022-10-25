import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../comment.service';
import { Output, EventEmitter } from '@angular/core';
import { SnackBarService } from '../../utility/snack-bar.service';

@Component({
  selector: 'app-comments-create',
  templateUrl: './comments-create.component.html',
  styleUrls: ['./comments-create.component.scss']
})
export class CommentsCreateComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() post_id
  comment = {
    content: '',
    post_id: ''
  }
  constructor(private commentService: CommentService, private _snackBar: SnackBarService) { }

  ngOnInit(): void {
  }
  create() {
    console.log(this.post_id);
    this.comment.post_id = this.post_id;
    this.commentService.create(this.comment).subscribe(resp => {
      this._snackBar.openSnackBar('Comment Created.', 'X');
      this.newItemEvent.emit('done');
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')

    });
  }
}
