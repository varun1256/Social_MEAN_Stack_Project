import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthenticationService,private layoutService:LayoutService,private router:Router) { }

  ngOnInit(): void {
  }
    loggedIn(){
    if(this.authService.isLoggedIn()){
      return true;
    }
    return false;
    }
    Logout(){
      localStorage.removeItem('token');
      this.router.navigate(['user/login']);
    }
}
