import { Component } from '@angular/core';
import { LoginService } from '../../Services/Login/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  credentialAdminUser = {
    "username": "harsh",
    "password": "Harsh@123"

  }

  credentialNormalUser = {
    "username": "harshnak",
    "password": "Harsh@123"

  }
  constructor(private loginService:LoginService, private router:Router, private snackBar: MatSnackBar){}
  loginUser(cred: any){

    this.loginService.genToken(cred).subscribe(
      (data: any) => {
        this.loginService.loginUser(data.token)
        this.loginService.getCurrentUser().subscribe(
          (data:any) => {
            this.loginService.setUser(data)
            Swal.fire({
              title: "Success",
              text: this.loginService.getUserRole() + " Login Successfully Completed",
              icon: "success"
            }).then(() => {
              if(this.loginService.getUserRole() == "Admin"){
                // window.location.href = 'admin-dashboard'
                this.router.navigate(['admin-dashboard'])
              }else if(this.loginService.getUserRole() == "Normal"){
                // window.location.href = 'user-dashboard'
                this.router.navigate(['user-dashboard'])
              }else{
                this.loginService.logoutUser()
              }
            });
            
          },
          (error) => {
            console.log(error)
            this.snackBar.open('User is not able to login', 'close', {
              duration: 3000
            })
          }
        )
      },
      (error) => {
        console.log(error)
        this.snackBar.open('Please check the credentials', 'close', {
          duration: 3000
        })
      }
    )
}
}
