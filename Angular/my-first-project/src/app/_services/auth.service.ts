import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private htttp:HttpClient){ }

  isAuthenticated():boolean{
    if(sessionStorage.getItem('token')!==null) {
      return true;
    }
    return false;
  }

  canAccess(){
    if(!this.isAuthenticated()){
      //redirect login
      this.router.navigate(['/login']);
    }

  } 
  canAuthenticate(){
    if(this.isAuthenticated()){
      //redirect dashboard
      this.router.navigate(['/dashboard']);
    }
  }
  register(name:string,email:string,password:string){
    //send data to register api  
    return this.htttp
    .post<{idToken:string}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmvGCvVizdHDfYbYqDdRgZJgxmPmJN9fs',
      {displayName:name,email,password} 
      );
  } 
  storeToken(token:string){
    sessionStorage.setItem('token',token);
  }
  login(email:string,password:string){
    //login api (firebase)
    return this.htttp
    .post<{idToken:string}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmvGCvVizdHDfYbYqDdRgZJgxmPmJN9fs',
      {email,password}
    );
  }
 
  detail(){
    let token = sessionStorage.getItem('token');
    return this.htttp.post<{users:Array<{localId:string,displayName:string}>}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDmvGCvVizdHDfYbYqDdRgZJgxmPmJN9fs',
      {idToken:token}
    );
  }
removeToken(){
  sessionStorage.removeItem('token');
}
}
