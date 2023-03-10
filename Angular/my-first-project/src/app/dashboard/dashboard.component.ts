import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private auth:AuthService) {}
  user = {localID:"someID",displayName:"Some Name"};
  ngOnInit():void {
 this.auth.canAccess();
    if(this.auth.isAuthenticated()) {
      //call user details
      this.auth.detail().subscribe({
        next:data=>{
          console.log(data)
          this.user.localID = data.users[0].localId;
          this.user.displayName = data.users[0].displayName;
        
        }
      })
    }
  }

}
