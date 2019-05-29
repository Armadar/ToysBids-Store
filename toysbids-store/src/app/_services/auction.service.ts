import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient) { }

  getAuctions(page: number) {
    return this.http.get(`https://randomuser.me/api/?results=10&page=${page}`);
  }
  getAuctionItems(auction: number, page: number) {
    return this.http.get(`https://randomuser.me/api/?results=10&page=${page}`);
  }
}