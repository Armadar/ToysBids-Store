import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionItem } from 'src/app/_model/auctionItem';

@Component({
  selector: 'app-auction-item-detail',
  templateUrl: './auction-item-detail.component.html',
  styleUrls: ['./auction-item-detail.component.css']
})
export class AuctionItemDetailComponent implements OnInit {

  _item: AuctionItem;
  description: string = "En 1979, se inicia en la estación de Lima el noticiero La rotativa del aire. Para entonces, la programación aún estaba basada en radionovelas, pero sus emisoras afiliadas empezaron a emitir programación en vivo desde la estación principal en la capital mediante cables coaxiales por algunas horas. Un mes después, la primera hora de la edición nocturna de La rotativa del aire comenzó a ser trasmitida al resto de las emisoras afiliadas en vivo a partir de las 7:00 pm y reemitida al día siguiente de 7:00 am a 8:00 pm. De esta manera, el enfoque de Radio Programas del Perú se centró en ser una emisora de noticias que, para 1980, ya contaba con un plantel periodístico en todas las regiones del Perú, En 1979, se inicia en la estación de Lima el noticiero La rotativa del aire. Para entonces, la programación aún estaba basada en radionovelas, pero sus emisoras afiliadas empezaron a emitir programación en vivo desde la estación principal en la capital mediante cables coaxiales por algunas horas. Un mes después, la primera hora de la edición nocturna de La rotativa del aire comenzó a ser trasmitida al resto de las emisoras afiliadas en vivo a partir de las 7:00 pm y reemitida al día siguiente de 7:00 am a 8:00 pm. De esta manera, el enfoque de Radio Programas del Perú se centró en ser una emisora de noticias que, para 1980, ya contaba con un plantel periodístico en todas las regiones del Perú. ";
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this._item = new AuctionItem(1000, 26.26, 26, 5, new Date(), new Date(), 8, 'image url');
    this._item.description = this.description;
  }

  setInfo(auctionInfo: any) {
    this._item.basePrice = auctionInfo.episode.length;
    this._item.description = auctionInfo.name;
  }
  save() {
    console.log(`Base Price: ${this._item.basePrice}  Description: ${this._item.description}`);
  }
}