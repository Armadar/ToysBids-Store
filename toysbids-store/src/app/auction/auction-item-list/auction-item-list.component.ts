import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuctionService } from 'src/app/_services/auction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionItem } from 'src/app/_model/auctionItem';

@Component({
  selector: 'app-auction-item-list',
  templateUrl: './auction-item-list.component.html',
  styleUrls: ['./auction-item-list.component.css']
})
export class AuctionItemListComponent implements OnInit {
  auctionItems: AuctionItem[] = [];
  page = 1;
  showLoadingIcon = true;
  auctionsCount = 0;
  auctionBundleId = 0;

  @Output() selectedAuctionItem: EventEmitter<number> = new EventEmitter<number>();

  constructor(private auctionService: AuctionService, private router: Router,
    private route: ActivatedRoute) {
  }
  ngOnInit() {}
  getAuctionItems() {
    this.auctionService.getAuctionItems(this.auctionBundleId, this.page).subscribe((res) => this.onSuccess(res));
  }
  getAuctionItemsByAuctionBundleId(auctionBundleId: number) {
    this.auctionItems = [];
    this.auctionBundleId = auctionBundleId;
    this.getAuctionItems()
  }

  onSuccess(res) {
    if (res != undefined) {
      let c = 1;
      res.forEach(item => {
        let auction = new AuctionItem(item.id, item.price, 0, 0, item.beginDate, item.endDate, 0, item.mainPicture);
        this.auctionItems.push(auction);
        c++;
      });
      this.showLoadingIcon = false;
      this.auctionsCount = this.auctionItems.length;
    }
  }
  onScroll() {
    this.showLoadingIcon = true;
    this.page = this.page + 1;
    this.getAuctionItems();
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