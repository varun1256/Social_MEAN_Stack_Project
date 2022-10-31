import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { SnackBarService } from '../../utility/snack-bar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  user = {
    first_name: "",
    last_name: "",
    phone_no: "",
    filePath: " "
  }
  file = {
    path: ""
  }
  uploadedImage
  url=environment.apiUrl
  formData = new FormData();
  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute, private _snackBar: SnackBarService) {
    this.route.params.subscribe(params => {
      this.usersService.loginProfile().subscribe(resp => {
        this.user = resp['user'];
        console.log(this.user);
        this._snackBar.openSnackBar("User profile fetched Successfully", "X");
      }, err => {
        this._snackBar.openSnackBar("User profile not available", "X");
      });
    });
  }

  ngOnInit(): void {
  }
 
  edit() {
    this.usersService.editUser(this.user).subscribe(resp => {
      this.user = resp['user'];
      console.log(this.user);
      this._snackBar.openSnackBar("User profile Edit Successfully", "X");
    }, err => {
      this._snackBar.openSnackBar(err.error.error, "X");
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
      this.usersService.upload('uploadProfile/', this.formData).subscribe(resp => {
        this.file = resp['file'];
        this._snackBar.openSnackBar("Kindly Press Edit", "X");
        console.log(this.file);
        this.user.filePath = this.file.path
        console.log(this.user);
      }, err => {

      });
    }
  }
  
  removePhoto() {
    this.usersService.Remove().subscribe(resp => {
      this._snackBar.openSnackBar("Profile Photo Removed", "X");
     window.location.reload();

    }, err => {
      this._snackBar.openSnackBar(err.error.error, "X");
    });
  }
}
