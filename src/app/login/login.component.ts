import { Component, OnInit } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //property /variable
  aim = 'Your perfect bankin Partner'
  account = 'Enter your account here'
  acno=''
  pswd=''
  //data base - bank

  userDetails:any = {
    1000:{acno:1000,username:"appu",password:1000,balane:5000},
    1001:{acno:1001,username:"apsu",password:1000,balane:5000},
    1002:{acno:1002,username:"meenu",password:1000,balane:5000}
  }

  // constructor

  constructor() { }

  // ngOnInit -Life Cycle Hook of angular
  ngOnInit(): void {
}

//user defined function 

//acnoChange()
acnoChange(event:any){
  this.acno = event.target.value
  console.log(this.acno);
  
}

//pswdChange()
pswdChange(event:any){
  this.pswd = event.target.value
  console.log(this.pswd);
  
}
  
 login() {
    var acno = this.acno
    var pswd = this.pswd

      let  userDetails = this.userDetails

     if(acno in userDetails){
       if(pswd == userDetails[acno]['password']){
        alert('Login sucessful')
          }
          else{
            alert('Incorrect Password')
          }
      }
     else{
       alert('User doesnot exist')
      }
    }
  }

  




