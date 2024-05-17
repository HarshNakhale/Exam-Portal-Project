import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../Services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit{

  quizId: undefined
  quizTitle: undefined
  addQuestionFormGroup: FormGroup
  questionFormSubmitted: boolean = false
  // public Editor = ClassicEditor;
  constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService, private snackBar: MatSnackBar){
    this.addQuestionFormGroup = new FormGroup({
      content: new FormControl("", [Validators.required]),
      option1: new FormControl("", [Validators.required]),
      option2: new FormControl("", [Validators.required]),
      option3: new FormControl("", [Validators.required]),
      option4: new FormControl("", [Validators.required]),
      answer: new FormControl("", [Validators.required]),
      quiz: new FormGroup({
        qid: new FormControl(this.quizId)
      })
      
    })
  }
  ngOnInit(){

    this.quizId = this.activatedRoute.snapshot.params["qid"]
    this.quizTitle = this.activatedRoute.snapshot.params["title"]
    this.addQuestionFormGroup.get('quiz')?.get('qid')?.setValue(this.quizId)
  }
  

  resetForm() {
    this.questionFormSubmitted = false
    this.addQuestionFormGroup.reset();
    for (let name in this.addQuestionFormGroup.controls) {
      this.addQuestionFormGroup.controls[name].setErrors(null)
    }
    // let formArray = this.addQuizFormGroup.get('category') as FormArray;
    // for (let name in formArray.controls) {
    //     formArray.controls[name].setErrors(null)
    // }
  }

  onSubmitQuestionForm() {

    const isQuizFormSubmitted = this.addQuestionFormGroup.valid
    if (isQuizFormSubmitted) {
      this.questionService.addQuestion(this.addQuestionFormGroup.value).subscribe(
        (data: any) => {
          Swal.fire({
            title: "Success",
            text: "Question Added Successfully",
            icon: "success"
          })
        },
        (error) => {
          console.log(error)
          this.snackBar.open('Unable to add the question', 'close', {
            duration: 3000
          })
          this.questionFormSubmitted = true
        }
      )
      this.resetForm()
    }
    else {
      this.snackBar.open('Form Is Invalid', 'Close', {
        duration: 3000
      })
      this.questionFormSubmitted = true
    }
  }



}
