import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Services/category.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { title } from 'node:process';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit{

  categories:any = []

  panelOpenState = false;

  constructor(private categoryService:CategoryService, private router:Router){}

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

}
