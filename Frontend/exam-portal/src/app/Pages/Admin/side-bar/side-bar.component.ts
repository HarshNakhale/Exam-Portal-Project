import { Component } from '@angular/core';
import { LoginService } from '../../../Services/Login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {


  constructor(public loginService: LoginService, private router:Router){}
  logoutUser(){

    this.loginService.logoutUser()
    // this.userLogin = false;
    // this.user = null
    this.router.navigate([''])
    
  }

}
