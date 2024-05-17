import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  hide: boolean = true
  signUpForm: FormGroup
  signUpFormSubmitted: boolean = false

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
    this.signUpForm = new FormGroup({
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required, Validators.pattern('[a-z]*')]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)]),
      about: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required, Validators.pattern('[0-9]{10}')])
    })
  }

  // checkValue(event: any){
  //   console.log(event)
  //   console.log(this.signUpForm.controls['username'])
  // }

  resetForm() {
    this.signUpFormSubmitted = false
    this.signUpForm.reset()
    for (let name in this.signUpForm.controls) {
      this.signUpForm.controls[name].setErrors(null)
    }
  }
  onSubmitSignUpForm() {
    const isFormValid = this.signUpForm.valid
    if (isFormValid) {
      this.userService.addUser(this.signUpForm.value).subscribe(
        (data: any) => {
          console.log(data)
          Swal.fire({
            title: "User Id " + data.id,
            text: "User SignUp Successfully Completed",
            icon: "success"
          });
          this.resetForm()
        },
        (error) => {
          this.snackBar.open('Something Went Wrong', 'close', {
            duration: 3000
          })
          this.signUpFormSubmitted = true
        }
      )
    } else {
      this.snackBar.open('Form Is Invalid', 'Close', {
        duration: 3000
      })
      this.signUpFormSubmitted = true
    }

  }
}
