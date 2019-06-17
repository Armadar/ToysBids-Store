import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuctionService } from 'src/app/_services/auction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Auction } from 'src/app/_model/auction';
import * as moment from 'moment';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  auctions: Auction[] = [];
  page = 1;
  showLoadingIcon = true;
  auctionsCount = 0;

  @Output() selectedAuction: EventEmitter<number> = new EventEmitter<number>();

  constructor(private auctionService: AuctionService, private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAuctionBundles();
  }

  getAuctionBundles() {
    this.auctionService.getAuctionBundles(this.page).subscribe((res) => this.onSuccess(res));
  }
  onSuccess(res) {
    if (res != undefined) {     
      res.forEach(item => {
        let auction = new Auction(item.id,item.categoryID,item.createdOn,item.createdOn,10);
        auction.range = this.generateRange(item.createdOn, item.createdOn);
        this.auctions.push(auction);
      });
      this.showLoadingIcon = false;
      this.auctionsCount = this.auctions.length;
    }
  }
  onScroll() {
    this.showLoadingIcon = true;
    this.page = this.page + 1;
    this.getAuctionBundles();
  }

  generateRange(from: Date, to: Date, ) {
    return `del ${moment(from).format("MMM Do YY")} al ${moment(to).format("MMM Do YY")}`;
  }

  createNewAuction() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}