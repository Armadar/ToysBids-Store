import { Component, AfterViewChecked, OnInit } from '@angular/core';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements AfterViewChecked, OnInit {
  myInnerHeight: number = 100;
  ngOnInit(): void {
    let headerPlusFooterHeight = 130;
    this.myInnerHeight = window.innerHeight - headerPlusFooterHeight;
  }


  constructor() { }
  ngAfterViewChecked(): void {

  }
}