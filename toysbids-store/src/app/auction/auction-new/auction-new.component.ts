import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import * as moment from 'moment';
import { AuctionNewHeaderComponent } from './../auction-new-header/auction-new-header.component';

@Component({
  selector: 'app-auction-new',
  templateUrl: './auction-new.component.html',
  styleUrls: ['./auction-new.component.css']
})
export class AuctionNewComponent implements OnInit {

  @ViewChild(AuctionNewHeaderComponent) child;
  uploadForm: FormGroup;

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  uploadSubmit() {
    console.log(`Selected Category: ${this.child.selectedCategory} Selected Date: ${this.child.selectedDate} Selected Time: ${this.child.selectedTime} Selected Time: ${this.child.selectedInterval}`);
  }
  getDateAndTime(event) {
    console.log(event);    
  }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null]
    });
  }


  onFileChanged(event) {
    var hour = 9;//moment(this.mytime).get('hour');
    var start = moment('2019-05-06').add(hour, 'hour');
    var minuteStep = 2;
    var count = 5;
    var list = [];
    for (let i = 0; i < this.uploader.queue.length; i++) {
      list.push(moment(start).add(i * minuteStep, 'minute').toString());
    }
    console.log(list);
  }
}