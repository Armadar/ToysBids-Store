import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http:HttpClient) { }

  getAuctions(page:number){
    return this.http.get(`https://randomuser.me/api/?results=20&page=${page}`);  
  }
}
