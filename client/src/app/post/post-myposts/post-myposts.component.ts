import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../../utility/snack-bar.service';
import { ListDialogComponent } from 'src/app/like/list-dialog/list-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-myposts',
  templateUrl: './post-myposts.component.html',
  styleUrls: ['./post-myposts.component.scss']
})
export class PostMypostsComponent implements OnInit {
  List_like=[]
  isListEmpty: Boolean = true;
  showdelete: Boolean = true;
  postList = []
  limit = 2;
  likebody = {
    post_id: ''
  }
  url=environment.apiUrl
  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute, private _snackBar: SnackBarService, public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.postService.mylist(this.limit, params['id']).subscribe(resp => {
        this.postList = JSON.parse(resp['postList']);
        this.showdelete = resp['showdelete'];

        console.log(this.postList);
        if (this.postList.length != 0) {
          this.isListEmpty = false;

        } else {
          this.isListEmpty = true;
          this._snackBar.openSnackBar('You have no post', 'X');
        }
      }, err => {
        this.isListEmpty = true;
        this._snackBar.openSnackBar(err.error.error, 'X')

      });
    })
  }

  ngOnInit(): void {
  }
  fetch() {
    this.limit = this.limit + 2;
    this.route.params.subscribe(params => {
      this.postService.mylist(this.limit, params['id']).subscribe(resp => {

        this.postList = JSON.parse(resp['postList']);
        this.showdelete = resp['showdelete'];
        console.log(this.postList);
        if (this.postList.length != 0) {
          this.isListEmpty = false;
        } else {
          this.isListEmpty = true;
        }
      }, err => {
        this.isListEmpty = true;
        this._snackBar.openSnackBar(err.error.error, 'X')

      });
    })
  }

  createLike(post_id) {
    console.log(post_id);
    this.likebody.post_id = post_id;
    this.postService.createlike(this.likebody).subscribe(resp => {
      this.LoadPostList();
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')

    });
   
  }

  unlike(post_id) {
    this.postService.destroyLike(post_id).subscribe(resp => {
      this.LoadPostList();
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')
    });
   
  }

  deletePost(id) {
    this.postService.removePost(id).subscribe(resp => {
      this._snackBar.openSnackBar('Post is Deleted', 'X');
      this.LoadPostList();
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')
    });
    }

  addComment($event) {
    this.LoadPostList();
  }

  LoadPostList() {
    this.route.params.subscribe(params => {
      this.postService.mylist(this.limit, params['id']).subscribe(resp => {

        this.postList = JSON.parse(resp['postList']);
        this.showdelete = resp['showdelete'];
        console.log(this.postList);
        if (this.postList.length != 0) {
          this.isListEmpty = false;
        } else {
          this.isListEmpty = true;
        }
      }, err => {
        this.isListEmpty = true;
        this._snackBar.openSnackBar(err.error.error, 'X')

      });
    })
  }
  openDialog(id): void {
    let LikeList = [{}]
    this.postService.likeList(id).subscribe(resp => {
      this.List_like = JSON.parse(resp['Likes']);
      let dialogRef = this.dialog.open(ListDialogComponent, {
        width: '250px',
        data:{
          List:this.List_like
        }
      });
     
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')
    });
    
   
  }
}
