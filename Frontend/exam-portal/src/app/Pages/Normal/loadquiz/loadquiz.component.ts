import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../Services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loadquiz',
  templateUrl: './loadquiz.component.html',
  styleUrl: './loadquiz.component.css'
})
export class LoadquizComponent implements OnInit{

  catId:undefined
  quizzes:any = []
  constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService){

  }

  ngOnInit(){
    this.activatedRoute.params.subscribe((params)=>{
      this.catId = params["catId"]
      if(this.catId == 0){
        this.quizService.getActiveQuiz().subscribe(
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
      }else{
        this.quizService.getActiveQuizzesByCategory(this.catId).subscribe(
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
    })
    
    

    
  }

}
