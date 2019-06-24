import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuctionBundle } from '../_model/auctionBundle';
import { Subject } from 'rxjs';
import { Auction } from '../_model/auction';
import { AuctionsMicroServiceURL } from './var.constant';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  onAuctionBundlesChanged = new Subject<any[]>();
  onAuctionIsUpdated = new Subject<Auction[]>();

  constructor(private http: HttpClient) { }

  getAuctionBundles(page: number) {
    AuctionsMicroServiceURL
    return this.http.get<AuctionBundle[]>(`${AuctionsMicroServiceURL}`);
  }
  getAuctionItems(auction: number, page: number) {
    return this.http.get<Auction[]>(`${AuctionsMicroServiceURL}/getauctionsbyauctionbundleid/${auction}`);
  }
  getAuctionInfo(auctionId: number) {
    return this.http.get<Auction>(`${AuctionsMicroServiceURL}/getauctioninfo/${auctionId}`);
  }
  updateAuction(auction: FormData, auctionBundleId: number) {
    return this.http.post<any>(`${AuctionsMicroServiceURL}/updateauction/`, auction).subscribe(res => {
      this.getAuctionItems(auctionBundleId, 1).subscribe(res => {
        this.onAuctionIsUpdated.next(res);
      });
    });
  }
  insertAuctionBundle(auctionBundle: FormData) {
    return this.http.post<any>(`${AuctionsMicroServiceURL}`, auctionBundle);
  }
  insertAuction(auction: FormData) {
    /*
    data.forEach((value, key) => {
      console.log("key %s: value %s", key, value);
    })
    */
    return this.http.post<any>(`${AuctionsMicroServiceURL}/uploadauction`, auction);
  }
  finishedSaveAuction(auctionBundleId: string) {
    this.getAuctionBundles(1).subscribe(response => {
      this.onAuctionBundlesChanged.next([response, auctionBundleId]);
    });
  }
}