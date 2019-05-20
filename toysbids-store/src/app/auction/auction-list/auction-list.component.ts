import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {

  ds = [
    { id: 1, name: 'Alabama', capital: 'Montgomery' },
    { id: 2, name: 'Alaska', capital: 'Juneau' },
    { id: 3, name: 'Arizona', capital: 'Phoenix' },
    { id: 4, name: 'Arkansas', capital: 'Little Rock' },
    { id: 5, name: 'California', capital: 'Sacramento' },
    { id: 6, name: 'Colorado', capital: 'Denver' },
    { id: 7, name: 'Connecticut', capital: 'Hartford' },
    { id: 8,name: 'Indiana', capital: 'Indianapolis' },
    { id: 9,name: 'Iowa', capital: 'Des Moines' },
    { id: 10,name: 'Kansas', capital: 'Topeka' },
    { id: 11,name: 'Kentucky', capital: 'Frankfort' },
    { id: 12,name: 'Louisiana', capital: 'Baton Rouge' },
    { id: 13,name: 'Maine', capital: 'Augusta' },
    { id: 14,name: 'Maryland', capital: 'Annapolis' },
    { id: 15,name: 'Massachusetts', capital: 'Boston' },
    { id: 16,name: 'Michigan', capital: 'Lansing' },
    { id: 17,name: 'Minnesota', capital: 'St. Paul' },
    { id: 18,name: 'Mississippi', capital: 'Jackson' },
    { id: 19,name: 'Missouri', capital: 'Jefferson City' },
    { id: 20,name: 'Montana', capital: 'Helena' },
    { id: 21,name: 'Nebraska', capital: 'Lincoln' },
    { id: 22,name: 'Nevada', capital: 'Carson City' },
    { id: 23,name: 'New Hampshire', capital: 'Concord' },
    { id: 24,name: 'New Jersey', capital: 'Trenton' },
    { id: 25,name: 'New Mexico', capital: 'Santa Fe' },
    { id: 26,name: 'New York', capital: 'Albany' },
    { id: 27,name: 'North Carolina', capital: 'Raleigh' },
    { id: 28,name: 'North Dakota', capital: 'Bismarck' },
    { id: 29,name: 'Ohio', capital: 'Columbus' },
    { id: 30,name: 'Oklahoma', capital: 'Oklahoma City' },
    { id: 31,name: 'Oregon', capital: 'Salem' },
    { id: 32,name: 'Pennsylvania', capital: 'Harrisburg' },
    { id: 33,name: 'Rhode Island', capital: 'Providence' },
    { id: 34,name: 'South Carolina', capital: 'Columbia' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
