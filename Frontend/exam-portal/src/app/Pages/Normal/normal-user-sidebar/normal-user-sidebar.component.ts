import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../Services/Login/login.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../../Services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-normal-user-sidebar',
  templateUrl: './normal-user-sidebar.component.html',
  styleUrl: './normal-user-sidebar.component.css'
})
export class NormalUserSidebarComponent implements OnInit{

  categories:any = []
  constructor(private loginService:LoginService, private router:Router, private categoryService:CategoryService){}

  ngOnInit(){
    this.categoryService.getAllCategories().subscribe(
      (data: any)=>{
        this.categories = data
      },
      (error)=>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!, Unable to fetch Categories",
        });
      }
    )
  }

  
  logoutUser(){

    this.loginService.logoutUser()
    // this.userLogin = false;
    // this.user = null
    this.router.navigate([''])
    
  }

}
