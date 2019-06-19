import { Component, EventEmitter, Output } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';

import { Category } from 'src/app/_model/category';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-auction-new-header',
  templateUrl: './auction-new-header.component.html',
  styleUrls: ['./auction-new-header.component.css']
})
export class AuctionNewHeaderComponent {

  myDate: Date = new Date();
  myTime: Date = this.getInitHour();

  title: string;
  selectedCategory: number = 0;
  selectedDate = this.getSelectedDate();
  selectedTime = this.getSelectedTime();
  selectedInterval: number = 2;
  basePrice: string;
  values: any[]

  constructor(private _localeService: BsLocaleService, private datePipe: DatePipe) {
    defineLocale('es', esLocale);
    this._localeService.use('es');
  }

  @Output() datetimeChanged: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() categoryChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() basePriceChanged: EventEmitter<string> = new EventEmitter<string>();

  getSelectedDate() { return this.datePipe.transform((moment(this.myDate).format('L')), "yyyy-MM-dd"); }
  getSelectedTime() { return moment(this.myTime).get('hour'); }

  getInitHour() {
    let r = new Date();
    r.setHours(18);
    return r;
  }

  categories: Category[] = [
    { id: 1, name: 'Transformers' },
    { id: 2, name: 'Star Wars' },
    { id: 3, name: 'Marvel' }
  ];
  minutes: any[] = [
    2,
    3,
    4,
    5
  ];

  onSelectedCategory(event) {
    var control = document.getElementById('category').children[0].children[0];
    if (event.value != undefined) {
      this.selectedCategory = event.value.id;
      control.classList.remove('border-red');
      control.classList.add('border-green');
      this.categoryChanged.emit(true);
    } else {
      this.selectedCategory = 0;
      control.classList.remove('border-green');
      control.classList.add('border-red');
      this.categoryChanged.emit(false);
    }
  }
  onDateChanged() {
    this.selectedDate = this.getSelectedDate();
    this.raiseEvent();
  }
  onTimeChanged() {
    this.selectedTime = this.getSelectedTime();
    this.raiseEvent();
  }
  onIntervalChanged(x) {
    this.selectedInterval = x.value;
    this.raiseEvent();
  }

  raiseEvent() {
    this.values = [];
    this.values.push(this.datePipe.transform((moment(this.myDate).format('L')), "yyyy-MM-dd"));
    this.values.push(moment(this.myTime).get('hour'));
    this.datetimeChanged.emit(this.values);
  }

  onKeyup(event: any) {
    this.basePrice = event.target.value;
  }
  applyBasePrice() {
    if (this.basePrice != undefined) {
      this.basePriceChanged.emit(this.basePrice);
    }
  }
}