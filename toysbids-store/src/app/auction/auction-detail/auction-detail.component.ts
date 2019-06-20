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
  @ViewChild(AuctionItemListComponent) auctionsList;
  @ViewChild(AuctionItemDetailComponent) auctionDetail;

  constructor(private auctionService: AuctionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.auctionsList.getAuctionItemsByAuctionBundleId(this.id);
    });
  }
  onSelectedAuctionItem(auctionItemId: number) {   
    this.auctionService.getAuctionInfo(auctionItemId).subscribe(res => {
      if (res != undefined) {
        this.auctionDetail.setInfo(res);
      }
    }, (err) => {
      //this.auction = []; this.message = err.message;
    });
  }
}