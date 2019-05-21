import { Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/_services/auction.service';
import { Auction } from 'src/app/_model/auction';

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

  constructor(private auctionService: AuctionService) {
  }

  ngOnInit() {
    this.getAuctions();
  }

  getAuctions() {
    this.auctionService.getAuctions(this.page).subscribe((res) => this.onSuccess(res));
  }
  onSuccess(res) {
    if (res != undefined) {
      res['results'].forEach(item => {
        this.auctions.push(new Auction(1, item.name.first, item.email));
      });
      this.showLoadingIcon = false;
      this.auctionsCount = this.auctions.length;
    }
  }
  onScroll() {
    this.showLoadingIcon = true;
    this.page = this.page + 1;
    this.getAuctions();
  }
  onSelectedItem(target,x) {
    this.unselectedItems();
    target.classList.add("itemSelected");
    console.log(x);
  }
  unselectedItems() {
    let publications = Array.from(document.getElementById('container').children);
    publications.forEach((publication) => {
      publication.classList.remove("itemSelected");
    });
  }
}