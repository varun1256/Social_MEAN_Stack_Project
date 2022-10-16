import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http:HttpClient,private router:Router) { }
  SignUp(user:any){
    return new Observable((observer) => {
			this.http.post(environment.apiUrl + 'user/signUp',user).subscribe(resp => {
        localStorage.setItem('token',resp["user"].token)
				this.router.navigate(['/']);
				observer.next(resp);
			}, err => {
				observer.error(err);
			});
		});
  }
 isLoggedIn(){
 if(localStorage.getItem('token')){
  return true;
 }
 return false;
}

LoggedIn(user:any){
  return new Observable((observer) => {
    this.http.post(environment.apiUrl + 'user/signIn',user).subscribe(resp => {
      localStorage.setItem('token',resp["user"].token)
      this.router.navigate(['/']);
      observer.next(resp);
    }, err => {
      observer.error(err);
    });
  });
}

jwtToken(){
  if(localStorage.getItem('token')){
    return localStorage.getItem('token');
  }
  return null;
}
}
