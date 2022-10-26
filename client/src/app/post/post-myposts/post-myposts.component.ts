import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../../utility/snack-bar.service';

@Component({
  selector: 'app-post-myposts',
  templateUrl: './post-myposts.component.html',
  styleUrls: ['./post-myposts.component.scss']
})
export class PostMypostsComponent implements OnInit {
  isListEmpty: Boolean = true;
  showdelete: Boolean = true;
  postList = []
  limit = 2;
  likebody = {
    post_id: ''
  }
  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute, private _snackBar: SnackBarService) {
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
     
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')

    });
    this.LoadPostList();
  }

  unlike(post_id) {
    this.postService.destroyLike(post_id).subscribe(resp => {
      
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')
    });
    this.LoadPostList();
  }

  deletePost(id) {
    this.postService.removePost(id).subscribe(resp => {
      this._snackBar.openSnackBar('Post is Deleted', 'X');
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')
    });
    this.LoadPostList();
    this.LoadPostList();
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
}
