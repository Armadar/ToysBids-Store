import { Component, OnInit, ViewChild, AfterViewInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import * as moment from 'moment';
import { AuctionNewHeaderComponent } from './../auction-new-header/auction-new-header.component';
import { Info } from 'src/app/_model/info';
import { ToastrService } from 'ngx-toastr';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as helper from './../../_helpers/helper'

@Component({
  selector: 'app-auction-new',
  templateUrl: './auction-new.component.html',
  styleUrls: ['./auction-new.component.css']
})
export class AuctionNewComponent implements OnInit {

  title: string = "Toys Bids";
  uploadForm: FormGroup;
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  isValid: boolean = false;
  isValidCategory = false;
  areThereImages = false;
  generalBasePrice: string;

  @ViewChild(AuctionNewHeaderComponent) child;
  myInnerHeight: number;

  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) { }

  getItemInfoById(id: any) {
    let info: Info = new Info(0, '', '');

    for (let i = 1; i <= this.uploader.queue.length; i++) {
      if (i === id) {
        let controlItem = document.getElementById('pub' + i.toString());

        if (controlItem != undefined) {
          let basePrice = (<HTMLInputElement>(controlItem.children[0].children[1].children[0].children[1].children[0])).value;
          let endTime = (<HTMLLabelElement>(controlItem.children[0].children[1].children[1].children[0])).innerText;          
          info.precio = basePrice;
          info.endTime = endTime;
        }
      }
    }

    return info;
  }

  onRemoveItem(): void {
    this.checkIsValid();
    this.refreshUIInfoTime();
  }

  isValidInfo() {
    let missingInfoTotal = 0;

    for (let i = 1; i <= this.uploader.queue.length; i++) {

      var controlItem = document.getElementById('pub' + i.toString());
      if (controlItem != undefined) {
        let controlBasePrice = controlItem.children[0].children[1].children[0].children[1].children[0];
        if (controlBasePrice != undefined) {
          let basePrice = (<HTMLInputElement>(controlBasePrice)).value;
          if (this.isNotValidBasePrice(basePrice)) {
            missingInfoTotal++;
            controlBasePrice.classList.add('pendinginfo');
          }
          else {
            controlBasePrice.classList.add('completedinfo');
          }
        }
      }

    }
    return missingInfoTotal > 0 ? false : true;
  }
  isNotValidBasePrice(val: any) {
    return val === undefined || val === null || val.length === 0 || isNaN(Number(val));
  }
  saveMassiveAcutions() {

    if (this.isValidInfo()) {
      for (var i = 0; i < this.uploader.queue.length; i++) {
        let fileItem = this.uploader.queue[i]._file;
        if (fileItem.size > 10000000) {
          alert("Cada imagen no debe superar los 10 MB.");
          return;
        }
      }
      // Auction Bundle
      let auctionBundle = this.createAuctionBundle();
      this.insertAuctionBundle(auctionBundle).subscribe(res => this.saveAuctions(res.message), err => {
        this.toastr.error(this.title, err.message, {
          timeOut: 3000
        });
      });
      //

    }
    else {
      this.toastr.error(this.title, "Ingrese los datos pendientes", {
        timeOut: 3000
      });
    }
  }

  saveAuctions(auctionbundleID: string) {
    console.log('generatedid:', auctionbundleID);
    if (auctionbundleID != undefined) {
      for (var j = 0; j < this.uploader.queue.length; j++) {
        let data = this.createAuction(j, auctionbundleID);
        this.uploadFile(data).subscribe(data => console.log(data.message), err => {
          this.toastr.error(this.title, err.message, {
            timeOut: 3000
          });
        });
      }
      this.uploader.clearQueue();
    }
  }

  createAuctionBundle() {
    let auctionBundle = new FormData();
    auctionBundle.append('id', "0");
    auctionBundle.append('StoreID', "1000");
    auctionBundle.append('CategoryID', this.child.selectedCategory);
    return auctionBundle;
  }
  createAuction(index: number, auctionBundleId: string) {
    let data = new FormData();
    let fileItem = this.uploader.queue[index]._file;
    let currentInfo = this.getItemInfoById(index + 1);

    data.append('auctionBundleId', auctionBundleId);
    data.append('price', currentInfo.precio);
    data.append('type', "1");
    data.append('CategoryID', this.child.selectedCategory);
    data.append('SellerID', "2");

    //data.append('parentId', '2626' + '_' + Date.now().toString());
    data.append('order', (index + 1).toString());
    data.append('ownFileName', fileItem.name);    
    data.append('endDate', this.child.selectedDate + " " + currentInfo.endTime);
    console.log('EndDate: ',this.child.selectedDate + " " + currentInfo.endTime);

    data.append('data', fileItem);

    return data;
  }

  insertAuctionBundle(auctionBundle: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:2000/api/auctions', auctionBundle);
  }

  uploadFile(auction: FormData): Observable<any> {
    /*
    data.forEach((value, key) => {
      console.log("key %s: value %s", key, value);
    })
    */
    //return this.http.post<any>('http://localhost:4000/images/upload', data);
    console.log('tryin to saving: ', auction);
    return this.http.post<any>('http://localhost:2000/api/auctions/uploadauction', auction);
  }

  showSelectedValues() {
    console.log(`Selected Category: ${this.child.selectedCategory} Selected Date: ${this.child.selectedDate} Selected Time: ${this.child.selectedTime} Selected Interval: ${this.child.selectedInterval}`);
  }
  onChildDateAndTimeChanged(event) {
    this.refreshUIInfoTime();
  }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null]
    });
    helper.avoidDragAndDrop("dropZone");
    this.whenAnImageIsDropped();
  }

  whenAnImageIsDropped() {
    let dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('drop', (e) => {
      this.refreshUIInfoTime();
      dropZone.classList.remove('dropzoneHightlight');
      dropZone.classList.remove('dropzoneFocus');
    });
  }

  onChangedCategory(validCategory) {
    this.isValidCategory = validCategory;
    this.checkIsValid();
  }
  onFileChanged(event) {
    this.refreshUIInfoTime();
    this.checkIsValid();
  }
  checkIsValid() {
    this.areThereImages = this.uploader.queue.length > 0;
    this.isValid = this.isValidCategory && this.areThereImages;
  }

  onDroppedWithInZone(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.uploader.queue, event.previousIndex, event.currentIndex);
    //console.log(`Moving from ${event.previousIndex} to ${event.currentIndex}`);
    this.refreshUIInfoTime();
  }

  refreshUIInfoTime() {
    setTimeout(() => {
      let publications = Array.from(document.getElementById('container').children);
      let c = 0;
      var start = moment(this.child.selectedDate).add(this.child.selectedTime, 'hour');

      var control;
      publications.forEach((publication) => {
        publication.children[0].children[1].children[1].children[0].innerHTML = this.getPublicationTime(start, c);
        control = publication.children[0];
        this.highLightTimeRange(control, c);
        c++;
      });
    }, 500);
  }

  getPublicationTime(start: any, index: number) {
    return moment(start).add(index * this.child.selectedInterval, 'minute').format('LT');
  }
  highLightTimeRange(ctrl: any, index: number) {
    if (ctrl != undefined) {
      if (index % 15 === 0 && (index != 0)) {
        ctrl.classList.add('border-publication');
      }
      else { ctrl.classList.remove('border-publication'); }
    }
  }

  onKeyup(event: any) {
    this.generalBasePrice = event.target.value;
  }
  onKeydown(event: any) {
    if (event.key === "Enter") {
      console.log(this.generalBasePrice);
    }
  }
}