import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  //to hold acno of current user
  acno:any

  //to hold transaction array of current user
  transaction:any

  constructor(private ds:DataService) { 
    //get the value of current user acno from data
    this.acno = this.ds.currentAcno
    //get transaction array from data service
    this.transaction =this.ds.getTransaction(this.acno)
    console.log(this.transaction);
    

  }

  ngOnInit(): void {
  }

}
