import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) { }
  create(postbody) {
    return new Observable((observer) => {
      console.log(this.authService.jwtToken());
      this.http.post(environment.apiUrl + 'post/create', postbody, {
        headers: {
          'authentication': this.authService.jwtToken()!
        }
      }).subscribe(resp => {
        this.router.navigate(['/']);
        observer.next(resp);
      }, err => {
        observer.error(err);
      });
    });
  }

}
