import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 constructor() { }

 ngOnInit(): void{
  
 }
  formdata = {name:"",email:"",password:""};
  submit=false;
  errorMessage="";
  loading=false;

onSubmit(){
  
  this.loading=true;
}
}
