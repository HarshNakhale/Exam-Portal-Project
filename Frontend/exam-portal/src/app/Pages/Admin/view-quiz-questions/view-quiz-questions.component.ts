import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../Services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId = undefined;
  qTitle = undefined;
  questions = [
    {
      answer: undefined,
      content: undefined,
      image: undefined,
      option1: undefined,
      option2: undefined,
      option3: undefined,
      option4: undefined,
      quesId: undefined,
      quiz: {
        qid: undefined,
        title: undefined,
        description: undefined,
        maxMarks: undefined,
        noOfQuestions: undefined,
        active: undefined,
        category: {
          title: undefined
        }
      }
    }
  ]
  constructor(private activatedRoute: ActivatedRoute, private questionsService: QuestionService) { }

  ngOnInit() {
    this.qId = this.activatedRoute.snapshot.params["qid"]
    this.qTitle = this.activatedRoute.snapshot.params["title"]

    this.questionsService.getQuestionsByQuiz(this.qId).subscribe(
      (data: any) => {
        this.questions = data
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

  deleteQuiz(questionId:any){

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
        this.questionsService.deleteQuestion(questionId).subscribe(
          (data: any)=>{
            this.questions = this.questions.filter((ques) => ques.quesId != questionId)
            Swal.fire({
              title: "Deleted!",
              text: "Your Question has been deleted.",
              icon: "success"
            });
          },
          (error)=>{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!, Unable to delete question",
            });
          }
        )
      }
    });


    
  }

}
