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
  register(name:string,email:string,password:string){
    //send data to register api  
    this.htttp.post()
  } 
}
