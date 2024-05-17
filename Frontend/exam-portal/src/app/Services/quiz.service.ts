import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public getAllQuizzes(){
    return this.http.get(`${baseUrl}quiz/`)
  }
  public getQuiz(quizId : any){
    return this.http.get(`${baseUrl}quiz/${quizId}`)
  }

  public addQuiz(quiz : any){
    return this.http.post(`${baseUrl}quiz/add`, quiz)
  }

  public updateQuiz(quiz : any){
    return this.http.put(`${baseUrl}quiz/update`, quiz)
  }

  public deleteQuiz(quizId : any){
    return this.http.delete(`${baseUrl}quiz/${quizId}`)
  }

  public getQuizzesByCategory(cid : any){
    return this.http.get(`${baseUrl}quiz/category/all/${cid}`)
  }

  public getActiveQuizzesByCategory(cid : any){
    return this.http.get(`${baseUrl}quiz/category/active/${cid}`)
  }

  public getActiveQuiz(){
    return this.http.get(`${baseUrl}quiz/active`)
  }


}
