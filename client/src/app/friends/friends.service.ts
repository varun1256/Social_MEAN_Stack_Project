import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) { }
  List(){
    return new Observable((observer) => {
      console.log(this.authService.jwtToken());
      this.http.get(environment.apiUrl + 'friends/list', {
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

   Unfriend(id){
    return new Observable((observer) => {
      console.log(this.authService.jwtToken());
      this.http.get(environment.apiUrl + 'friends/unfriend?friend_id='+id, {
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
