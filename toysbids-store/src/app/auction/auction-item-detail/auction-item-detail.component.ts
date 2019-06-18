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

  _item: AuctionItem;
  constructor(private auctionService: AuctionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this._item = new AuctionItem(0, 0,0, 0, new Date(), new Date(), 8, 'image url');
    //this._item.description = this.description;
  }

  setInfo(auctionInfo: any) {
    this._item = auctionInfo;
  }
  save() {
    this.auctionService.updateAuction(this._item.id, this._item.price).subscribe((res) => this.onSuccess(res));
  }
  onSuccess(res) {
    if (res != undefined) {
    }
  }
}