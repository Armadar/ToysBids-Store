import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuctionItemListComponent } from '../auction-item-list/auction-item-list.component';
import { AuctionService } from 'src/app/_services/auction.service';
import { AuctionItemDetailComponent } from '../auction-item-detail/auction-item-detail.component';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit {
  id: number;
  @ViewChild(AuctionItemListComponent) child;
  @ViewChild(AuctionItemDetailComponent) child2;

  constructor(private auctionService: AuctionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.child.getAuctionItemsByAuctionBundleId(this.id);
    });
  }

  onSelectedAuctionItem(auctionItemID) {
    this.auctionService.getAuctionInfo(auctionItemID).subscribe(data => {
      this.child2.setInfo(data);
    });
  }
}