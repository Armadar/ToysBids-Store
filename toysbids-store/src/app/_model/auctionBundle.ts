export class AuctionBundle {
  id: number;
  storeId: number;
  categoryId: number;
  title: string;
  from: Date;
  to: Date;
  createdOn: Date;
  createdBy: number;
  auctionsCount: number;
  range: string;

  constructor(id: number, storeId: number, categoryId: number, title: string, from: Date, to: Date, createdOn: Date, createdBy: number, auctionsCount: number) {
    this.id = id;
    this.storeId = storeId;
    this.categoryId = categoryId;
    this.title = title;
    this.from = from;
    this.to = to;
    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.auctionsCount = auctionsCount;
  }
}