export class Auction {
  id: number;
  category: string;
  from: Date;
  to: Date;
  count: number;
  range: string;

  constructor(id: number, category: string, from: Date, to: Date, count: number) {
    this.id = id;
    this.category = category;
    this.from = from;
    this.to = to;
    this.count = count;
  }
}