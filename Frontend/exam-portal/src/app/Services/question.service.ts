import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  public getQuestionsByQuiz(quizId: any){
    return this.http.get(`${baseUrl}question/quiz/all/${quizId}`)
  }

  public getQuestionsByQuizUser(quizId: any){
    return this.http.get(`${baseUrl}question/quiz/${quizId}`)
  }

  public addQuestion(question: any){
    return this.http.post(`${baseUrl}question/add`, question)
  }

  public deleteQuestion(quizId: any){
    return this.http.delete(`${baseUrl}question/${quizId}`)
  }

  public evalQuiz(questions: any){
    return this.http.post(`${baseUrl}question/eval-quiz`, questions)
  }
}
