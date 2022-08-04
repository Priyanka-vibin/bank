import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //login username
  user = ""

  //deposite model
  depositForm = this.fb.group({

    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
  })

  //withdraw model
  withdrawForm = this.fb.group({

    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
  })

  //share to child
  acno: any
  sDetails:any


  constructor(private router: Router, private fb: FormBuilder, private ds: DataService) {
    this.user = this.ds.currentUser
    this.sDetails= new Date()
  }


  ngOnInit(): void {
    if (!localStorage.getItem('currentAcno')) {
      alert('Please Log In')
      this.router.navigateByUrl('')
    }
  }

  deposit() {

    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount

     
    if (this.depositForm.valid) {
      const result = this.ds.deposit(acno, pswd, amount)

      if (result) {
        alert(`${amount} is credited , New balance is ${result}`)
      }
    }
    else {
      alert('Invalid Form')
    }

  }




  withdraw() {

    var acno = this.withdrawForm.value.acno1
    var pswd = this.withdrawForm.value.pswd1
    var amount = this.withdrawForm.value.amount1

    if (this.withdrawForm.valid) {
      const result = this.ds.withdraw(acno, pswd, amount)

      if (result) {
        alert(`${amount} is debited, new balance is ${result}`)
      }
    }
    else {
      alert('Invalid Form')
    }
  }


  //logout
  logout() {
    //remove login acno and username
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentUser')
    //navigate to login page
    this.router.navigateByUrl('')
  }

  //deleteParent()
  deleleteParent() {
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '')
  }
  oncancel(){
    this.acno=""
  }

} 