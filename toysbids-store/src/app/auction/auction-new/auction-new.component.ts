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
          info.precio = basePrice;
        }
      }
    }

    return info;
  }

  onRemoveItem(): void {
    this.checkIsValid();
    this.refreshUIInfoTime();
  }

  getpublicationID(id: string) {
    return id.toString().substring(3);
  }

  isValidInfo() {
    let missingInfoTotal = 0;

    for (let i = 1; i <= this.uploader.queue.length; i++) {

      var controlItem = document.getElementById('pub' + i.toString());
      if (controlItem != undefined) {
        let controlBasePrice = controlItem.children[0].children[1].children[0].children[1].children[0];
        if (controlBasePrice != undefined) {
          let basePrice = (<HTMLInputElement>(controlBasePrice)).value;
          if (this.isValidBasePrice(basePrice)) {
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
  isValidBasePrice(val: any) {
    return val === undefined || val === null || val.length === 0 || isNaN(Number(val));
  }
  saveMassiveAcutions() {
    if (this.isValidInfo()) {
      for (var i = 0; i < this.uploader.queue.length; i++) {
        let fileItem = this.uploader.queue[i]._file;
        if (fileItem.size > 10000000) {
          alert("Each File should be less than 10 MB of size.");
          return;
        }
      }
      for (var j = 0; j < this.uploader.queue.length; j++) {
        let data = this.createData(j);
        this.uploadFile(data).subscribe(data => alert(data.message), err => {
          this.toastr.error(this.title, err.message, {
            timeOut: 3000
          });
        });
      }
      this.uploader.clearQueue();
    }
    else {
      this.toastr.error(this.title, "Ingrese los datos pendientes", {
        timeOut: 3000
      });
    }
  }

  createData(index: number) {
    let data = new FormData();
    let fileItem = this.uploader.queue[index]._file;
    let currentInfo = this.getItemInfoById(index + 1);

    data.append('parentId', '2626' + '_' + Date.now().toString());
    data.append('id', (index + 1).toString());
    data.append('ownFileName', fileItem.name);
    data.append('price', currentInfo.precio);
    data.append('description', currentInfo.description);
    data.append('image', fileItem);
    //data.append('dataType', this.uploadForm.controls.type.value);
    return data;
  }

  uploadFile(data: FormData): Observable<any> {
    data.forEach((value, key) => {
      console.log("key %s: value %s", key, value);
    })
    return this.http.post<any>('http://localhost:4000/images/upload', data);
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
    console.log('FILE CHANGED !!!' + new Date().getTime());
    this.refreshUIInfoTime();
    this.checkIsValid();
  }

  checkIsValid() {
    this.areThereImages = this.uploader.queue.length > 0;
    this.isValid = this.isValidCategory && this.areThereImages;
  }

  onDroppedWithInZone(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.uploader.queue, event.previousIndex, event.currentIndex);
    console.log(`Moving from ${event.previousIndex} to ${event.currentIndex}`);
    this.refreshUIInfoTime();
  }

  refreshUIInfoTime() {
    this.showSelectedValues();
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

}