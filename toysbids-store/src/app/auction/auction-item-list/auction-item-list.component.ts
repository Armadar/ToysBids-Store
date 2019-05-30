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
  auctionID = 0;

  @Output() selectedAuction: EventEmitter<number> = new EventEmitter<number>();

  constructor(private auctionService: AuctionService, private router: Router,
    private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.getAuctionItems();
  }
  dosomething(auctionID: number) {
    this.auctionItems = [];
    this.auctionID = auctionID;
    this.getAuctionItems()
  }
  getAuctionItems() {
    this.auctionService.getAuctionItems(this.auctionID, this.page).subscribe((res) => this.onSuccess(res));
    console.log(`Getting Items from auction: ${this.auctionID} ...`)
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
  /*
  onSelectedItem(target, id: number) {
    this.selectedAuction.emit(id);
    this.unselectedItems();
    target.classList.add("itemSelected");
  }
  unselectedItems() {
    let publications = Array.from(document.getElementById('container-auctions').children);
    publications.forEach((publication) => {
      publication.classList.remove("itemSelected");
    });
  }
  */
}