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
  ngOnInit() {
    this.getAuctionItems();
  }
  getAuctionItemsByAuctionBundleId(auctionBundleId: number) {
    this.auctionItems = [];
    this.auctionBundleId = auctionBundleId;
    this.getAuctionItems()
  }
  getAuctionItems() {
    this.auctionService.getAuctionItems(this.auctionBundleId, this.page).subscribe((res) => this.onSuccess(res));
  }
  onSuccess(res) {
    if (res != undefined) {
      let c = 1;
      res['results'].forEach(item => {
        let auction = new AuctionItem(c, item.dob.age, item.dob.age + 5, item.registered.aged, new Date(), new Date(), item.name.first.length, item.picture.medium);
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