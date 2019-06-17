export class Info {
    index: number;
    precio: string;
    description: string;
    endTime:string;
  
    constructor(index: number, precio: string, description: string) {
      this.index = index;
      this.precio = precio;
      this.description = description;
    }
  }