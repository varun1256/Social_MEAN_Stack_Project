import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) { }

  create(body) {
    return new Observable((observer) => {
      console.log(this.authService.jwtToken());
      this.http.post(environment.apiUrl + 'comment/create', body, {
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
  list(limit,post_id){
    return new Observable((observer) => {
      console.log(this.authService.jwtToken());
      this.http.get(environment.apiUrl + 'comment/list?limit='+limit+'&post_id='+post_id, {
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

  removeComment(post_id,comment_id){
    return new Observable((observer) => {
      this.http.delete(environment.apiUrl + 'comment/delete?post_id='+post_id+'&comment_id='+comment_id, {
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
