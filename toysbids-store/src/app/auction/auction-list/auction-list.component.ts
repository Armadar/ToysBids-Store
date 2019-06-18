import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuctionService } from 'src/app/_services/auction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuctionBundle } from 'src/app/_model/auctionBundle';
import * as moment from 'moment';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  auctionBundles: AuctionBundle[] = [];
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
        let ab = new AuctionBundle(item.id, item.storeID, item.categoryID, item.title, item.from, item.to, item.createdOn, item.createdBy, item.auctionsCount);
        ab.range = this.generateRange(item.from, item.to);
        this.auctionBundles.push(ab);
      });
      this.showLoadingIcon = false;
      this.auctionsCount = this.auctionBundles.length;
    }
  }
  onScroll() {
    this.showLoadingIcon = true;
    this.page = this.page + 1;
    this.getAuctionBundles();
  }

  generateRange(from: Date, to: Date, ) {
    let year = new Date(from).getFullYear() == new Date().getFullYear() ? '' : ' YY';
    return `del ${moment(from).format("Do MMM" + year)} al ${moment(to).format("Do MMM" + year)}`;
  }

  createNewAuction() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}