import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root'
})
export class DataService {

cuurentUser:any

currentAcno:any

  //data base - bank
  userDetails: any = {
    1000: { acno: 1000, username: "appu", password: 1000, balance: 5000 ,transaction:[]},
    1001: { acno: 1001, username: "apsu", password: 1000, balance: 5000 ,transaction:[] },
    1002: { acno: 1002, username: "meenu", password: 1000, balance: 5000 ,transaction:[] }
  }

  constructor() { }



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
        balane: 0,
        transaction: []

      }
      console.log(userDetails);
      return true
    }
  }


  login(acno: any, pswd: any) {

    let userDetails = this.userDetails
    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        this.cuurentUser = userDetails[acno]['username']
        this.currentAcno = acno
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

  deposit(acno:any, pswd: any, amount: any) {
    let userDetails = this.userDetails
    console.log(userDetails)
    var amount1 = parseInt(amount)

    if (acno in userDetails) {
      if (pswd==userDetails[acno]['password']) {
        userDetails[acno]['balance']+=amount1
        userDetails[acno]['transaction'].push({
          type: 'CREDIT',
          amount
        })
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

  withdraw(acno: any, pswd: any, amount: any) {
    let userDetails = this.userDetails
    var amt = parseInt(amount)

    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {

        if (userDetails[acno]['balance'] > amt) {
          userDetails[acno]['balance'] -= amt
          userDetails[acno]['transaction'].push({
            type: 'DEBIT',
            amount
          })
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

