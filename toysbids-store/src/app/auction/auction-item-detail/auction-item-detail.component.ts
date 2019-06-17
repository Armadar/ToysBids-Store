import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionItem } from 'src/app/_model/auctionItem';
import { AuctionService } from 'src/app/_services/auction.service';

@Component({
  selector: 'app-auction-item-detail',
  templateUrl: './auction-item-detail.component.html',
  styleUrls: ['./auction-item-detail.component.css']
})
export class AuctionItemDetailComponent implements OnInit {

  _item: AuctionItem;
  //description: string = "En 1979, se inicia en la estación de Lima el noticiero La rotativa del aire. Para entonces, la programación aún estaba basada en radionovelas, pero sus emisoras afiliadas empezaron a emitir programación en vivo desde la estación principal en la capital mediante cables coaxiales por algunas horas. Un mes después, la primera hora de la edición nocturna de La rotativa del aire comenzó a ser trasmitida al resto de las emisoras afiliadas en vivo a partir de las 7:00 pm y reemitida al día siguiente de 7:00 am a 8:00 pm. De esta manera, el enfoque de Radio Programas del Perú se centró en ser una emisora de noticias que, para 1980, ya contaba con un plantel periodístico en todas las regiones del Perú, En 1979, se inicia en la estación de Lima el noticiero La rotativa del aire. Para entonces, la programación aún estaba basada en radionovelas, pero sus emisoras afiliadas empezaron a emitir programación en vivo desde la estación principal en la capital mediante cables coaxiales por algunas horas. Un mes después, la primera hora de la edición nocturna de La rotativa del aire comenzó a ser trasmitida al resto de las emisoras afiliadas en vivo a partir de las 7:00 pm y reemitida al día siguiente de 7:00 am a 8:00 pm. De esta manera, el enfoque de Radio Programas del Perú se centró en ser una emisora de noticias que, para 1980, ya contaba con un plantel periodístico en todas las regiones del Perú. ";
  constructor(private auctionService: AuctionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log('init');
    this._item = new AuctionItem(0, 0,0, 0, new Date(), new Date(), 8, 'image url');
    //this._item.description = this.description;
  }

  setInfo(auctionInfo: any) {
    console.info(auctionInfo);
    //this._item.basePrice = auctionInfo.price;
    //this._item.description = '';
  }
  save() {
    this.auctionService.updateAuction(this._item.id, this._item.basePrice).subscribe((res) => this.onSuccess(res));
  }
  onSuccess(res) {
    if (res != undefined) {
    }
  }
}