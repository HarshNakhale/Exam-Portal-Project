import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { UserService } from '../../Services/user.service';
import { LoginService } from '../../Services/Login/login.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide: boolean = true
  loginForm: FormGroup
  loginFormSubmitted: boolean = false

  constructor(private loginService: LoginService, private snackBar: MatSnackBar, private router:Router){
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.pattern('[a-z]*')]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)]),
    })
  }

  resetForm() {
    this.loginFormSubmitted = false
    this.loginForm.reset()
    for (let name in this.loginForm.controls) {
      this.loginForm.controls[name].setErrors(null)
    }
  }

  onSubmitLoginForm(){
    const isFormValid = this.loginForm.valid

    if(isFormValid){
      this.loginService.genToken(this.loginForm.value).subscribe(
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
              this.loginFormSubmitted = true
            }
          )
          this.resetForm()
        },
        (error) => {
          console.log(error)
          this.snackBar.open('Please check the credentials', 'close', {
            duration: 3000
          })
          this.loginFormSubmitted = true
        }
      )
    }else{
      this.snackBar.open('Form Is Invalid', 'Close', {
        duration: 3000
      })
      this.loginFormSubmitted = true
    }
  }


}
