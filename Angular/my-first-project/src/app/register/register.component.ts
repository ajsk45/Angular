import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 constructor(private auth:AuthService) { }

 ngOnInit(): void{
  this.auth.canAuthenticate();
 }
  formdata = {name:"",email:"",password:""};
  submit=false;
  errorMessage="";
  loading=false;

onSubmit(){
  
  this.loading=true;
  this.auth.register(this.formdata.name,this.formdata.email,this.formdata.password)
  .subscribe({
    next:data=>{
      //token response data
      this.auth.storeToken(data.idToken);
      console.log('Registered idToken is '+data.idToken)
      this.auth.canAuthenticate();

    },
    error:data=>{
      if(data.error.error.messae=="INVALID_EMAIL") {
        this.errorMessage = "Invalid Email";
        } else if (data.error.error.messae="EMAIL_EXISS") {
          this.errorMessage = "Already Email Exists"
        }else {
           this.errorMessage="Unknowen erroe occured en creating this account!"
        } 
    }
  }).add(() =>{
    this.loading=false;
    console.log('Register completed')
  })
}
}
