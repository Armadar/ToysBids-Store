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
    //return this.http.get(`https://rickandmortyapi.com/api/character/${auctionId}`);
    return this.http.get(`http://localhost:2000/api/auctions/getauctioninfo/${auctionId}`);
  }
  updateAuction(auction: FormData) {
    return this.http.post<any>('http://localhost:2000/api/auctions/updateauction/',auction);
  }
  insertAuctionBundle(auctionBundle: FormData){
    return this.http.post<any>('http://localhost:2000/api/auctions', auctionBundle);
  }
  insertAuction(auction: FormData){
    /*
    data.forEach((value, key) => {
      console.log("key %s: value %s", key, value);
    })
    */
    return this.http.post<any>('http://localhost:2000/api/auctions/uploadauction', auction);
  }
}