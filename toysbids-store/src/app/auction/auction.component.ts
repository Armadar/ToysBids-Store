import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements AfterViewInit {
  myInnerHeight: number;

  constructor() { }
  ngAfterViewInit(): void {
    let headerPlusFooterHeight = 130;
    this.myInnerHeight = window.innerHeight - headerPlusFooterHeight;
  }
}