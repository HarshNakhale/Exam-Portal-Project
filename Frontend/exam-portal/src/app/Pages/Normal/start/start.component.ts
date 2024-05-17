import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../Services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit{
  qid: undefined
  questions:any = []
  timer = 0

  isSubmit: boolean = false

  constructor(private locationStrategy:LocationStrategy, private activatedRoute:ActivatedRoute, private questionService:QuestionService, private route:Router){
  }
  ngOnInit(): void {
    this.preventBackButton()
    this.qid = this.activatedRoute.snapshot.params["qid"]
    this.questionService.getQuestionsByQuizUser(this.qid).subscribe(
      (data: any) => {
        console.log(data)
        this.questions = data
        this.timer = this.questions.length * 2 * 60
        this.questions.forEach((q:any) => {
          q["givenAnswer"] = ''
        });
        this.startTImer()
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!, Unable to fetch Questions By Quiz",
        });
      }
    )
  }

  preventBackButton(){
    history.pushState(null, location.href)
    this.locationStrategy.onPopState(()=>{
      history.pushState(null, location.href)
    })
  }

  evalQuiz(){
    // this.questions.forEach((q:any)=>{
    //   if(q.givenAnswer == q.answer){
    //     this.correctAnswer++
    //     let marksPerQuestion = this.questions[0].quiz.maxMarks / this.questions.length
    //     this.marksGot += marksPerQuestion
    //   }

    //   if(q.givenAnswer.trim()!=''){
    //     this.attemptedQuestions++
    //   }
      
    // })
    this.questionService.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        this.isSubmit = true
        Swal.fire({
          title: "Quiz Has Been Submitted",
          confirmButtonText: "User - Dashboard",
          // showDenyButton:true,
          // denyButtonText:'Print',
          icon: "success",
          html:`<h2>Marks Got: ` +Number(data.marksGot).toFixed(2)  +  `</h2><br><h2>Correct Questions: ` + data.correctAnswer +   `</h2><br><h2>Attempted Questions: ` + data.attemptedQuestions + `</h2>`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if(result.isConfirmed){this.route.navigate(['/user-dashboard'])}
          // if(result.isDenied){
          //   this.printPage()
          //   setTimeout(() => {
          //   }, 2000);
          // }
          
        });
      },
      (error)=>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!, Unable to Evaluate Quiz",
        });
      }
    )
    
  }

  submitQuiz(){
    Swal.fire({
      title: "Do you want to submit the quiz?",
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Don't Submit"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.evalQuiz()
      }
    });
  }


  startTImer(){
    let t = window.setInterval(()=>{

      if(this.timer <= 0){
        this.evalQuiz()
      }else{
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime(){
    let min = Math.floor(this.timer/ 60)
    let sec = this.timer - (min*60)
    return `${min} min : ${sec} sec`
  }

  printPage(){
    window.print()
  }

}
