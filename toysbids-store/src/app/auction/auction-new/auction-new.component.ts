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
import { AuctionService } from 'src/app/_services/auction.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  c: number;

  @ViewChild(AuctionNewHeaderComponent) child;
  myInnerHeight: number;

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

  constructor(private auctionService: AuctionService, private fb: FormBuilder, private toastr: ToastrService) { }

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

  save() {
    if (this.isValidInfo()) {
      for (var i = 0; i < this.uploader.queue.length; i++) {
        let fileItem = this.uploader.queue[i]._file;
        if (fileItem.size > 10000000) {//TODO: Test image over 10 MB size
          alert("Cada imagen no debe superar los 10 MB.");
          return;
        }
      }
      let auctionBundle = this.createAuctionBundle();
      this.auctionService.insertAuctionBundle(auctionBundle).subscribe(res => this.saveAuctions(res.auctionBundleId), err => {
        this.toastr.error(this.title, err.message, {
          timeOut: 3000
        });
      });
    }
    else {
      this.toastr.error(this.title, "Ingrese los datos pendientes", {
        timeOut: 3000
      });
    }
  }

  saveAuctions(auctionBundleId: string) {
    this.c = 0;
    if (auctionBundleId != undefined) {
      for (var j = 0; j < this.uploader.queue.length; j++) {
        let auction = this.createAuction(j, auctionBundleId);
        this.auctionService.insertAuction(auction).subscribe(res => this.workingWithTheResult(auctionBundleId), err => {
          this.toastr.error(this.title, err.message, {
            timeOut: 3000
          });
        });
      }
    }
  }
  workingWithTheResult(res: any) {
    this.c++;
    if (this.c === this.uploader.queue.length) {
      this.auctionService.finishedSaveAuction(res);
      this.toastr.success(this.title, "Las subastas han sido publicadas ", {
        timeOut: 4000
      });
    }
  }

  createAuctionBundle() {
    let auctionBundle = new FormData();
    auctionBundle.append('title', this.child.title);
    auctionBundle.append('id', "0");//TODO Validate 
    auctionBundle.append('StoreID', "1000");//TODO
    auctionBundle.append('CategoryID', this.child.selectedCategory);
    auctionBundle.append('to', this.child.selectedDate)
    auctionBundle.append('CreatedBy', "1000")//TODO
    return auctionBundle;
  }
  createAuction(index: number, auctionBundleId: string) {
    let auction = new FormData();
    let fileItem = this.uploader.queue[index]._file;
    let currentInfo = this.getItemInfoById(index + 1);

    auction.append('auctionBundleId', auctionBundleId);
    auction.append('price', currentInfo.precio);
    auction.append('type', "1");//TODO: Auction or Direct sale
    auction.append('CategoryID', this.child.selectedCategory);
    auction.append('SellerID', "2");//TODO: current Store
    auction.append('endDate', this.child.selectedDate + " " + currentInfo.endTime);
    auction.append('image', fileItem);
    return auction;
  }

  onChildDateAndTimeChanged(event) {
    this.refreshUIInfoTime();
  }
  onCategoryChanged(validCategory) {
    this.isValidCategory = validCategory;
    this.checkIsValid();
  }
  onBasePriceChanged(basePrice) {
    this.setBasePrice(basePrice);
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

  setBasePrice(generalBasePrice: string) {
    setTimeout(() => {
      let auctions = Array.from(document.getElementById('container').children);
      auctions.forEach((publication) => {
        let controlBasePrice = publication.children[0].children[1].children[0].children[1].children[0];
        (<HTMLInputElement>controlBasePrice).value = generalBasePrice;
      });
    }, 250);
  }
}