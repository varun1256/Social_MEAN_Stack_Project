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

  list(limit){
    return new Observable((observer) => {
      console.log(this.authService.jwtToken());
      this.http.get(environment.apiUrl + 'post/list?limit='+limit, {
        headers: {
          'authentication': this.authService.jwtToken()!
        }
      }).subscribe(resp => {
        observer.next(resp);
      }, err => {
        observer.error(err);
      });
    });
  }

  createlike(body) {
    return new Observable((observer) => {
      this.http.post(environment.apiUrl + 'like/create', body, {
        headers: {
          'authentication': this.authService.jwtToken()!
        }
      }).subscribe(resp => {
        observer.next(resp);
      }, err => {
        observer.error(err);
      });
    });
  }

  destroyLike(post_id){
    return new Observable((observer) => {
      this.http.get(environment.apiUrl + 'like/destroy?post_id='+post_id, {
        headers: {
          'authentication': this.authService.jwtToken()!
        }
      }).subscribe(resp => {
        observer.next(resp);
      }, err => {
        observer.error(err);
      });
    });
  }
  mylist(limit){
    return new Observable((observer) => {
      this.http.get(environment.apiUrl + 'post/myposts?limit='+limit, {
        headers: {
          'authentication': this.authService.jwtToken()!
        }
      }).subscribe(resp => {
        observer.next(resp);
      }, err => {
        observer.error(err);
      });
    });
  }
}
