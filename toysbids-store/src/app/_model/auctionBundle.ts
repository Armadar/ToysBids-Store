export class AuctionBundle {
  id: number;
  title: string;
  category: string;
  from: Date;
  to: Date;
  count: number;
  range: string;

  constructor(id: number, title: string, category: string, from: Date, to: Date, count: number) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.from = from;
    this.to = to;
    this.count = count;
  }
}