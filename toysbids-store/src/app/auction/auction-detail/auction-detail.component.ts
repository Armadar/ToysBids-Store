import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuctionItemListComponent } from '../auction-item-list/auction-item-list.component';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit {
  id: number;
  @ViewChild(AuctionItemListComponent) child;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.child.dosomething(this.id);
      /*
      this.platoService.getPlato(this.id).subscribe(data => {
        this.plato = data;
      });
      */
    });
  }

  onSelectedAuctionItem(auctionItemID) {
    console.log(auctionItemID);
  }
}