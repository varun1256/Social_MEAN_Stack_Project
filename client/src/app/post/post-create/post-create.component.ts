import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { SnackBarService } from '../../utility/snack-bar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  post = {
    content: "",
    filePath: ""
  }
  file = {
    path: ""
  }
  url=environment.apiUrl
  uploadedImage
  formData = new FormData();
  constructor(private postService: PostService,private _snackBar:SnackBarService) { }

  ngOnInit(): void {
  }
  postForm() {
    this.postService.create(this.post).subscribe(resp => {
      this._snackBar.openSnackBar('Post Created.', 'X');
    }, err => {
      this._snackBar.openSnackBar(err.error.error, 'X')

    });
  }

  onChange(event) {
    this.uploadedImage = event.target.files[0]
  }
  uploadImage() {
    if (this.uploadedImage) {
      this.formData.append('image', this.uploadedImage, this.uploadedImage.name)
      console.log(this.formData.getAll('image')) //confirms file is being uploaded properly
      console.log(this.uploadedImage);
      console.log(this.uploadedImage.name);
      this.postService.upload('uploadImage/', this.formData).subscribe(resp => {
        this.file = resp['file'];
        console.log(this.file);
        this.post.filePath = this.file.path
        console.log(this.post);
      }, err => {

      });
    }
  }
}
