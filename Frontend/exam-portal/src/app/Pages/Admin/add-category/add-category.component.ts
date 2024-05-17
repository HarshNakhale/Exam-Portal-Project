import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../Services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  addCategoryFormGroup: FormGroup
  categoryFormSubmitted: boolean = false
  constructor(private categoryService: CategoryService,private snackBar: MatSnackBar) {
    this.addCategoryFormGroup = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.pattern('[A-Za-z]*')]),
      description: new FormControl("", [Validators.required]),
    })
  }

  resetForm() {
    this.categoryFormSubmitted = false
    this.addCategoryFormGroup.reset()
    for (let name in this.addCategoryFormGroup.controls) {
      this.addCategoryFormGroup.controls[name].setErrors(null)
    }
  }

  onSubmitCategoryForm() {

    const isCategoryFormSubmitted = this.addCategoryFormGroup.valid

    if (isCategoryFormSubmitted) {
      this.categoryService.addCategory(this.addCategoryFormGroup.value).subscribe(
        (data: any) => {
          Swal.fire({
            title: "Success",
            text: "Category Added Successfully",
            icon: "success"
          })
        },
        (error) => {
          console.log(error)
          this.snackBar.open('Unable to add the category', 'close', {
            duration: 3000
          })
          this.categoryFormSubmitted = true
        }
      )
      this.resetForm()
    }
    else {
      this.snackBar.open('Form Is Invalid', 'Close', {
        duration: 3000
      })
      this.categoryFormSubmitted = true
    }
  }
}
