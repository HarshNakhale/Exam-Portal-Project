import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../Services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit{
  panelOpenState: boolean = false
  
  quizzes = [
    {
      qid: undefined,
      title: undefined,
      description: undefined,
      maxMarks: undefined,
      noOfQuestions: undefined,
      active: undefined,
      category:{
        title: undefined
      }

    }
  ]

  constructor(private quizService: QuizService){}
  ngOnInit(){

    this.quizService.getAllQuizzes().subscribe(
      (data: any)=>{
        this.quizzes = data
      },
      (error)=>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!, Unable to fetch Quizzes",
        });
      }
    )
  }

  deleteQuiz(quizId:any){

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(quizId).subscribe(
          (data: any)=>{
            this.quizzes = this.quizzes.filter((quiz) => quiz.qid != quizId)
            Swal.fire({
              title: "Deleted!",
              text: "Your Quiz has been deleted.",
              icon: "success"
            });
          },
          (error)=>{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!, Unable to delete quiz",
            });
          }
        )
      }
    });


    
  }
}
