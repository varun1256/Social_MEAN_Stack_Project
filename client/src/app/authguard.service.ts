import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
 

@Injectable()
export class AuthguardService {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

//check some condition  
if (localStorage.getItem('token'))  {
  return true;
} 
this.router.navigate(['/user/login']);
return false;
    }
}
