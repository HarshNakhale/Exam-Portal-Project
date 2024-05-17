import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../Services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent implements OnInit{

  qid:undefined
  quiz:any = {}

  constructor(private activatedRoute: ActivatedRoute, private quizService:QuizService, private route:Router){}

  ngOnInit(){
    this.qid = this.activatedRoute.snapshot.params["qid"]
    this.quizService.getQuiz(this.qid).subscribe(
      (data: any)=>{
        this.quiz = data
      },
      (error)=>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!, Unable to fetch Quiz",
        });
      }
    )
  }

  startQuiz(){

    Swal.fire({
      title: "Do you want to start the quiz?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Start",
      denyButtonText: `Don't Start`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.route.navigate(['/start-quiz/' + this.qid])
      } else if (result.isDenied) {
        Swal.fire("Quiz Not Started", "", "info");
      }
    });
  }
}
