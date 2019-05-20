import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSelectedItem(event) {
    let publications = Array.from(document.getElementById('container').children[0].children);
    publications.forEach((publication) => {
      publication.classList.remove("itemSelected");
    });

    event.srcElement.parentNode.classList.add("itemSelected");
  }
  onVirtualChanged(event) {
    console.log(new Date().toString());
  }
}