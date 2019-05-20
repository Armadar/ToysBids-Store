import { Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/_services/auction.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  users = [];
  page = 1;
  maximumPages = 3;

  constructor(private auctionService: AuctionService) {
  }

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos() {
    console.log(this.page);
    this.auctionService.getAuctions(this.page).subscribe((res) => this.onSuccess(res));
  }

  // When we got data on a success  
  onSuccess(res) {
    console.log(res);
    if (res != undefined) {
      /*
      res.forEach(item => {  
        this.myPhotosList.push(new PhotosObj(item));  
      });  
*/
      this.users = res['results'];
    }
  }

  // When scroll down the screen  
  onScroll() {
    console.log("Scrolled");
    this.page = this.page + 1;
    this.getPhotos();
  }


  onSelectedItem(event) {
    let publications = Array.from(document.getElementById('container').children[0].children);
    publications.forEach((publication) => {
      publication.classList.remove("itemSelected");
    });

    event.srcElement.parentNode.classList.add("itemSelected");
  }
}