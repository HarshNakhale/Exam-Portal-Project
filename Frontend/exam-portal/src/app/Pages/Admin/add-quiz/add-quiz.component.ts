import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { QuizService } from '../../../Services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../Services/category.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit{

  categories:any = []
  addQuizFormGroup: FormGroup
  quizFormSubmitted: boolean = false

  constructor(private quizService: QuizService,private snackBar: MatSnackBar, private categoryService: CategoryService) {
    this.addQuizFormGroup = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.pattern('[A-Za-z ]*')]),
      description: new FormControl("", [Validators.required]),
      maxMarks: new FormControl("", [Validators.required, Validators.pattern('[0-9]*',)]),
      noOfQuestions: new FormControl("", [Validators.required, Validators.pattern('[0-9]*')]),
      active: new FormControl("true", [Validators.required]),
      category: new FormGroup({
        cid: new FormControl(null, [Validators.required])
      })
      
    })
  }

  ngOnInit(){
    this.categoryService.getAllCategories().subscribe(
      (data: any)=>{
        this.categories = data
      },
      (error)=>{
        this.snackBar.open('Unable to get the categories', 'close', {
          duration: 3000
        })
      }
    )
  }

  resetForm() {
    this.quizFormSubmitted = false
    this.addQuizFormGroup.reset();
    for (let name in this.addQuizFormGroup.controls) {
      this.addQuizFormGroup.controls[name].setErrors(null)
    }
    let formArray = this.addQuizFormGroup.get('category') as FormArray;
    for (let name in formArray.controls) {
        formArray.controls[name].setErrors(null)
    }
  }

  onSubmitQuizForm() {

    const isQuizFormSubmitted = this.addQuizFormGroup.valid

    if (isQuizFormSubmitted) {
      this.quizService.addQuiz(this.addQuizFormGroup.value).subscribe(
        (data: any) => {
          Swal.fire({
            title: "Success",
            text: "Quiz Added Successfully",
            icon: "success"
          })
        },
        (error) => {
          console.log(error)
          this.snackBar.open('Unable to add the quiz', 'close', {
            duration: 3000
          })
          this.quizFormSubmitted = true
        }
      )
      this.resetForm()
    }
    else {
      this.snackBar.open('Form Is Invalid', 'Close', {
        duration: 3000
      })
      this.quizFormSubmitted = true
    }
  }
}

