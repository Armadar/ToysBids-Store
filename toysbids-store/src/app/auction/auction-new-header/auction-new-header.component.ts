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

  selectedCategory: number = 0;
  selectedDate = this.getSelectedDate();
  selectedTime = this.getSelectedTime();
  selectedInterval: number = 2;

  values: any[]

  constructor(private _localeService: BsLocaleService, private datePipe: DatePipe) {
    defineLocale('es', esLocale);
    this._localeService.use('es');
  }

  @Output() emision: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() changeCategory: EventEmitter<boolean> = new EventEmitter<boolean>();

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
    { id: 3, name: 'Marvel Legends' },
    { id: 4, name: 'Saint Seiya' },
    { id: 5, name: 'GIJOE' }
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
      this.changeCategory.emit(true);
    } else {
      this.selectedCategory = 0;
      control.classList.remove('border-green');
      control.classList.add('border-red');
      this.changeCategory.emit(false);
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
  }

  raiseEvent() {
    this.values = [];
    this.values.push(moment(this.myDate).format('L'));
    this.values.push(moment(this.myTime).get('hour'));
    this.emision.emit(this.values);
  }
}