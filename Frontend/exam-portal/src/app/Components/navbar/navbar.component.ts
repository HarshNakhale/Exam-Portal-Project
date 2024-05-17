import { Component } from '@angular/core';
import { LoginService } from '../../Services/Login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  
  constructor(public loginService: LoginService, private router:Router){}

  ngOnInit(){
    // this.userLogin = this.loginService.isLoggedIn()
    // this.user = this.loginService.getUserFromLocal()
  }
  logoutUser(){

    this.loginService.logoutUser()
    // this.userLogin = false;
    // this.user = null
    this.router.navigate([''])
    
  }

}
