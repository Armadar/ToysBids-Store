export class Auction {
  id: number;
  price: number;
  currentBid: number;
  bidCount: number;
  startDate: Date;
  endDate: Date;
  followedBy: number;
  mainPicture: string;
  description: string;

  constructor(id: number, basePrice: number, currentBid: number, bidCount: number, startDate: Date, endDate: Date, followedBy: number, mainPicture: string) {
    this.id = id;
    this.price = basePrice;
    this.currentBid = currentBid;
    this.bidCount = bidCount;
    this.startDate = startDate;
    this.endDate = endDate;
    this.followedBy = followedBy;
    this.mainPicture = mainPicture;
  }
}