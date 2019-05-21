export class Auction {
    id: number;
    title: string;
    subtitle:string;
  
    constructor(id: number, title: string,subtitle: string) {
      this.id = id;
      this.title = title;
      this.subtitle = subtitle;
    }
  }