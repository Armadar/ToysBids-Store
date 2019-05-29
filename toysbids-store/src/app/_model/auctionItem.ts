export class AuctionItem {
  id: number;
  basePrice: number;
  currentBid: number;
  bidCount: number;
  startDate: Date;
  endDate: Date;
  followedBy: number

  constructor(id: number, basePrice: number, currentBid: number, bidCount: number, startDate: Date, endDate: Date, followedBy: number) {
    this.id = id;
    this.basePrice = basePrice;
    this.currentBid = currentBid;
    this.bidCount = bidCount;
    this.startDate = startDate;
    this.endDate = endDate;
    this.followedBy = followedBy;
  }
}