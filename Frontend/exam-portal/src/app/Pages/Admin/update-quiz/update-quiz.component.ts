import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../Services/quiz.service';
import Swal from 'sweetalert2';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../Services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit {

  updateFormGroup: FormGroup
  updateFormSubmitted: boolean = false
  qid = 0
  quiz:any = {}
  categories:any=[]
  constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService, private categoryService: CategoryService, private snackBar: MatSnackBar) {
    this.updateFormGroup = new FormGroup({
      qid:new FormControl(null),
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

  resetForm() {
    this.updateFormSubmitted = false
    this.updateFormGroup.reset();
    for (let name in this.updateFormGroup.controls) {
      this.updateFormGroup.controls[name].setErrors(null)
    }
    let formArray = this.updateFormGroup.get('category') as FormArray;
    for (let name in formArray.controls) {
      formArray.controls[name].setErrors(null)
    }
  }

  updateQuizForm() {
    const isQuizFormSubmitted = this.updateFormGroup.valid

    if (isQuizFormSubmitted) {
      this.quizService.updateQuiz(this.updateFormGroup.value).subscribe(
        (data: any) => {
          Swal.fire({
            title: "Success",
            text: "Quiz Updated Successfully",
            icon: "success"
          })
        },
        (error) => {
          console.log(error)
          this.snackBar.open('Unable to update the quiz', 'close', {
            duration: 3000
          })
          this.updateFormSubmitted = true
        }
      )
      this.resetForm()
    }
    else {
      this.snackBar.open('Form Is Invalid', 'Close', {
        duration: 3000
      })
      this.updateFormSubmitted = true
    }
  }


  ngOnInit() {
    this.qid = this.activatedRoute.snapshot.params["qid"]
    this.quizService.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data
        this.updateFormGroup.controls['qid'].setValue(this.qid)
        this.updateFormGroup.controls['title'].setValue(this.quiz.title)
        this.updateFormGroup.controls['description'].setValue(this.quiz.description)
        this.updateFormGroup.controls['maxMarks'].setValue(this.quiz.maxMarks)
        this.updateFormGroup.controls['noOfQuestions'].setValue(this.quiz.noOfQuestions)
        this.updateFormGroup.controls['active'].setValue(this.quiz.active)
        
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!, Unable to fetch Quizzes",
        });
      }
    )
    this.categoryService.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!, Unable to fetch Categories",
        });
      }
    )



  }

}
