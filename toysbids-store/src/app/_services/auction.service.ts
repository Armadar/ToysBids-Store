import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient) { }

  getAuctionBundles(page: number) {
    //return this.http.get(`https://randomuser.me/api/?results=10&page=${page}`);
    return this.http.get(`http://localhost:2000/api/auctions`);
  }
  getAuctionItems(auction: number, page: number) {
    //return this.http.get(`https://randomuser.me/api/?results=10&page=${auction}`);
    return this.http.get(`http://localhost:2000/api/auctions/getauctionsbyauctionbundleid/${auction}`);
  }
  getAuctionInfo(auctionId: number) {
    return this.http.get(`https://rickandmortyapi.com/api/character/${auctionId}`);
  }
}