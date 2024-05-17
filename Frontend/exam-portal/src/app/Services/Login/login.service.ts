import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { LocalStorageService } from '../localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }



  public getCurrentUser(){
    return this.http.get(`${baseUrl}current-user`)
  }


  public genToken(user : any){
    return this.http.post(`${baseUrl}login`, user)
  }

  public loginUser(token: string){
    this.localStorageService.setItem('token', token)
    // localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = this.localStorageService.getItem('token')
    // let tokenStr = localStorage.getItem('token')
    if(tokenStr == undefined || tokenStr == null || tokenStr == ''){
      return false;
    }else{
      return true;
    }
  }


  public logoutUser(){
    // localStorage.removeItem('token')
    // localStorage.removeItem('user')
    this.localStorageService.clear()
    return true
  }

  public getTokenFromLocal(){
    // return localStorage.getItem('token')
    return this.localStorageService.getItem('token')
  }

  public setUser(user: any){
    // localStorage.setItem('user', JSON.stringify(user))
    this.localStorageService.setItem('user', JSON.stringify(user))
    return true
  }

  public getUserFromLocal(){
    // let userStr = localStorage.getItem('user')
    let userStr = this.localStorageService.getItem('user')
    if(userStr != null){
      return JSON.parse(userStr)
    }else{
      this.logoutUser();
      return null
    }
  }


  public getUserRole(){
    let user = this.getUserFromLocal();
    return user.authorities[0].authority
  }


}
