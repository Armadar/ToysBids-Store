import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionItem } from 'src/app/_model/auctionItem';
import { AuctionService } from 'src/app/_services/auction.service';

@Component({
  selector: 'app-auction-item-detail',
  templateUrl: './auction-item-detail.component.html',
  styleUrls: ['./auction-item-detail.component.css']
})
export class AuctionItemDetailComponent implements OnInit {

  auction: AuctionItem;
  constructor(private auctionService: AuctionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.auction = new AuctionItem(0, 0,0, 0, new Date(), new Date(), 8, '');
  }

  setInfo(auctionInfo: AuctionItem) {
    this.auction = auctionInfo;
  }

  creationAuction() {
    let auction = new FormData();
    auction.append('id', this.auction.id.toString());
    auction.append('price', this.auction.price.toString());
    auction.append('description', this.auction.description);
    return auction;
  }

  save() {
    this.auctionService.updateAuction(this.creationAuction()).subscribe((res) => this.onSuccess(res));
  }
  onSuccess(res) {
    if (res != undefined) {
    }
  }
}