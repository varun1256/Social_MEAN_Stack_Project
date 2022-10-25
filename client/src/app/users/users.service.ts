import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) {

   }
   List(){
    return new Observable((observer) => {
      console.log(this.authService.jwtToken());
      this.http.get(environment.apiUrl + 'user/list', {
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

   getProfile(id){
    return new Observable((observer) => {
      console.log(this.authService.jwtToken());
      this.http.get(environment.apiUrl + 'user/view?id='+id, {
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

   RequestSend(body){
    return new Observable((observer) => {
      console.log(this.authService.jwtToken());
      this.http.post(environment.apiUrl + 'request/create',body, {
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

   loginProfile(){
    return new Observable((observer) => {
      console.log(this.authService.jwtToken());
      this.http.get(environment.apiUrl + 'user/profile', {
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

   editUser(body){
    return new Observable((observer) => {
      this.http.put(environment.apiUrl + 'user/edit',body, {
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
