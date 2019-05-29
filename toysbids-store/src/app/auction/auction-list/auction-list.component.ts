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

  constructor(private auctionService: AuctionService,private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAuctions();
  }

  getAuctions() {
    this.auctionService.getAuctions(this.page).subscribe((res) => this.onSuccess(res));
  }
  onSuccess(res) {
    if (res != undefined) {
      let c = 1;
      res['results'].forEach(item => {
        let auction = new Auction(c, item.location.state, item.dob.date, item.registered.date, item.dob.age);
        auction.range = this.generateRange(item.dob.date, item.registered.date);
        this.auctions.push(auction);
        c++;
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

  generateRange(from: Date, to: Date, ) {
    return `del ${moment(from).format("MMM Do YY")} al ${moment(to).format("MMM Do YY")}`;
  }

  createNewAuction() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}