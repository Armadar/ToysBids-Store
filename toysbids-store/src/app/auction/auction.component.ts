import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit,AfterViewInit {
  ngAfterViewInit(): void {
    this.myInnerHeight = window.innerHeight - 150;
  }
  myInnerHeight: number;
  constructor() { }

  ngOnInit() {
  }

}
