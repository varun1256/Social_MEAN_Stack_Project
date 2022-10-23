import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  post={
    content:"",
    filePath:""
  }
  file={
    path:""
  }
 uploadedImage
 formData = new FormData();
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
 
 onChange(event) {
  this.uploadedImage = event.target.files[0]
}
uploadImage(){
  if (this.uploadedImage) {
    this.formData.append('image', this.uploadedImage, this.uploadedImage.name)
    console.log(this.formData.getAll('image')) //confirms file is being uploaded properly
    console.log(this.uploadedImage);
    console.log(this.uploadedImage.name);
    this.postService.upload('uploadImage/', this.formData).subscribe(resp => {
      this.file=resp['file'];
      console.log(this.file);
      this.post.filePath=this.file.path
      console.log(this.post);
    },err=>{

    });
}
}
}
