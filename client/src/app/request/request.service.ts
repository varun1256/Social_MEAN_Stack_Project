import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private authService:AuthenticationService,private http:HttpClient) { }

  List(){
    return new Observable((observer) => {
      console.log(this.authService.jwtToken());
      this.http.get(environment.apiUrl + 'request/list', {
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

   RequestAccept(id){
    return new Observable((observer) => {
      console.log(this.authService.jwtToken());
      this.http.get(environment.apiUrl + 'request/accept?id='+id, {
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
