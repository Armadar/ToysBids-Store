import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auction-item-detail',
  templateUrl: './auction-item-detail.component.html',
  styleUrls: ['./auction-item-detail.component.css']
})
export class AuctionItemDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

}
