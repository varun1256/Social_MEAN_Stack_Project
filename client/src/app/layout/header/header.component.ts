import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthenticationService,private layoutService:LayoutService) { }

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
      window.location.reload();
    }
}
