import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
// import { Action } from 'rxjs/internal/scheduler/Action';

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

 
  // constructor

  constructor(private router:Router,private ds:DataService) { }

  // ngOnInit -Life Cycle Hook of angular
  ngOnInit(): void {
}

//user defined function 

// //acnoChange()
// acnoChange(event:any){
//   this.acno = event.target.value
//   console.log(this.acno);
  
// }

// //pswdChange()
// pswdChange(event:any){
//   this.pswd = event.target.value
//   console.log(this.pswd);
  
// }
  
 login() {
    var acno = this.acno
    var pswd = this.pswd

    const result = this.ds.login(acno,pswd)
   if(result){
    alert('Login sucessfull')
    this.router.navigateByUrl('dashboard')
   }
     
    }
  }


//login with -2 arg -template reference

    // login(a:any,p:any) {

    //   var acno = a.value
    //   var pswd = p.value
  
    //     let  userDetails = this.userDetails
  
    //    if(acno in userDetails){
    //      if(pswd == userDetails[acno]['password']){
    //       alert('Login sucessful')
    //         }
    //         else{
    //           alert('Incorrect Password')
    //         }
    //     }
    //    else{
    //      alert('User doesnot exist')
    //     }
    //   }
  

  




