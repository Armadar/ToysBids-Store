import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuctionService } from 'src/app/_services/auction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Auction } from 'src/app/_model/auction';

@Component({
  selector: 'app-auction-item-list',
  templateUrl: './auction-item-list.component.html',
  styleUrls: ['./auction-item-list.component.css']
})
export class AuctionItemListComponent implements OnInit {
  auctions: Auction[] = [];
  page = 1;
  showLoadingIcon = true;
  auctionsCount = 0;
  auctionBundleId = 0;
  message: string;

  @Output() selectedAuctionItem: EventEmitter<number> = new EventEmitter<number>();

  constructor(private auctionService: AuctionService, private router: Router,
    private route: ActivatedRoute) {
  }
  ngOnInit() { }
  getAuctionItemsByAuctionBundleId(auctionBundleId: number) {
    this.auctionBundleId = auctionBundleId;
    this.auctionService.getAuctionItems(this.auctionBundleId, this.page).subscribe(res => {
      if (res != undefined) {
        this.auctions = res;
        this.showLoadingIcon = false;
        this.auctionsCount = this.auctions.length;
      }
    }, (err) => {
      this.auctions = []; this.message = err.message;
    });
  }

  onScroll() {
    this.showLoadingIcon = true;
    this.page = this.page + 1;
    this.getAuctionItemsByAuctionBundleId(this.auctionBundleId);
  }
  onSelectedItem(target, id: number) {
    this.selectedAuctionItem.emit(id);
    this.unselectedItems();
    target.classList.add("itemSelected");
  }
  unselectedItems() {
    let publications = Array.from(document.getElementById('container-auctions').children);
    publications.forEach((publication) => {
      publication.classList.remove("itemSelected");
    });
  }
}