import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root'
})
export class DataService {

currentUser:any

currentAcno:any

  //data base - bank
  userDetails: any = {
    1000: { acno: 1000, username: "appu", password: 1000, balance: 5000 ,transaction:[]},
    1001: { acno: 1001, username: "apsu", password: 1000, balance: 5000 ,transaction:[] },
    1002: { acno: 1002, username: "meenu", password: 1000, balance: 5000 ,transaction:[] }
  }

  constructor() { 
    this.getDetails()
  }

  //saveDetails()-to store data in local storage
  saveDetails(){
    if(this.userDetails){
      localStorage.setItem('database',JSON.stringify(this.userDetails))
    }
    if(this.currentAcno){

      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
    }
    if(this.currentUser){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
  }
}

//get data from local storage
getDetails(){
  //get database
 if(localStorage.getItem('database')){
  this.userDetails = JSON.parse(localStorage.getItem('database') || '')
 }
 if(localStorage.getItem('currentAcno')){
  this.currentAcno = JSON.parse(localStorage.getItem('currentAcno') || '')
 }
 if(localStorage.getItem('currentUser')){
  this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '')
 }

}



  //register

  register(acno: any, username: any, password: any) {
    let userDetails = this.userDetails
    if (acno in userDetails) {
      return false
    }
    else {
      userDetails[acno] = {
        acno,
        username,
        password,
        balance: 0,
        transaction: []

      }
      this.saveDetails()
      console.log(userDetails);
      return true
    }
  }


  login(acno: any, pswd: any) {

    let userDetails = this.userDetails
    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        this.currentUser = userDetails[acno]['username']
        this.currentAcno = acno
        this.saveDetails()
        return true
      }
      else {
        alert('Incorrect Password')
        return false
      }
    }
    else {
      alert('User doesnot exist')
      return false
    }
  }



  //deposit

  deposit(acno:any, pswd: any, amt: any) {
    let userDetails = this.userDetails
    console.log(userDetails)
    var amount = parseInt(amt)

    if (acno in userDetails) {
      if (pswd==userDetails[acno]['password']) {
        userDetails[acno]['balance']+=amount
        userDetails[acno]['transaction'].push({
          type: 'CREDIT',
          amount
        })
        this.saveDetails()
        console.log(userDetails);
        return userDetails[acno]['balance']
      }
      else {
        alert('Incorrect Password')
        return false
      }
    }
    else {
      alert('User does not exist')
      return false
    }
  }


  //withdraw

  withdraw(acno: any, pswd: any, amt: any) {
    let userDetails = this.userDetails
    var amount = parseInt(amt)

    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {

        if (userDetails[acno]['balance'] > amount) {
          userDetails[acno]['balance'] -= amount
          userDetails[acno]['transaction'].push({
            type: 'DEBIT',
            amount
          })
          this.saveDetails()
          console.log(userDetails);
          
          return userDetails[acno]['balance']
        }
        else {
          alert('Insufficient balance')
          return false
        }
      }

      else {
      
        alert('Incorrect Password')
        return false
      }
    }
    else {
      alert('User does not Exist')
      return false
    }
  }


  //transaction

  getTransaction(acno:any){
   return this.userDetails[acno]['transaction']
  }

}


