import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
export class AuctionNewComponent implements OnInit{

  title: string = "Toys Bids";
  uploadForm: FormGroup;
  info: Info[] = new Array();
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  isValid: boolean = false;
  isValidCategory = false;
  areThereImages = false;

  @ViewChild(AuctionNewHeaderComponent) child;
  myInnerHeight: number;

  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) { }


  onSetPrice(id: any, value: string): void {
    console.log('on SetPrice', `ID: ${id} value: ${value}`);
    /* var elemId = event.explicitOriginalTarget.id; document.getElementById(elemId).classList.remove('focused');*/
    if (!this.info.some(e => e.index === id)) {
      this.info.push(new Info(id, value, ''));
      // does not exist
    }
    else {
      this.info.forEach(e => {
        if (e.index === id) {
          e.precio = value;
        }
      })
    }
    console.log(this.info);
  }
  getItemInfoById(id: any) {
    return this.info.find(e => e.index.toString() === id.toString());
  }
  onRemoveItem(id: any): void {
    /* var elemId = event.explicitOriginalTarget.id; document.getElementById(elemId).classList.remove('focused');*/
    if (this.info.length != id) {
      this.info.forEach(i => {
        if (i.index >= id && i.index < this.info.length) {
          this.info[i.index - 1].precio = this.info[i.index].precio;
          this.info[i.index - 1].description = this.info[i.index].description;
        }
      });
    }
    this.info.pop();

    console.log(`the index ${id} just has been removed`);
    console.log(this.info);
    this.checkIsValid();
  }
  isValidInfo() {
    let missingInfoTotal = 0;

    for (let i = 1; i <= this.uploader.queue.length; i++) {
      console.log(i);
      var info = this.getItemInfoById(i);
      var control = document.getElementById(i.toString());
      console.log(info);
      if (info === undefined) {
        missingInfoTotal++;
        if (control != undefined) {
          control.children[0].children[1].children[0].children[1].children[0].classList.add('pendinginfo');
        }
      } else {
        if (control != undefined) {
          if (this.isMissingInfo(info)) {
            missingInfoTotal++;
            control.children[0].children[1].children[0].children[1].children[0].classList.add('pendinginfo');
          } else {
            control.children[0].children[1].children[0].children[1].children[0].classList.add('completedinfo');
          }
        }
      }
    }
    return missingInfoTotal > 0 ? false : true;
  }
  isMissingInfo(info: Info) {
    return info.precio === undefined || info.precio === null || info.precio.length === 0 || isNaN(Number(info.precio));
  }
  uploadSubmit() {
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
      this.info = [];
      console.log(this.info);
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
    /*
    data.forEach((value, key) => {
      console.log("key %s: value %s", key, value);
    })
    */
    return this.http.post<any>('http://localhost:4000/images/upload', data);
  }

  uploadSubmitMessage() {
    console.log(`Selected Category: ${this.child.selectedCategory} Selected Date: ${this.child.selectedDate} Selected Time: ${this.child.selectedTime} Selected Time: ${this.child.selectedInterval}`);
  }
  getDateAndTime(event) { }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null]
    });
    helper.avoidDragAndDrop("dropZone");
  }

  onChangedCategory(validCategory) {
    this.isValidCategory = validCategory;
    this.checkIsValid();
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

    this.checkIsValid();
  }

  checkIsValid() {
    this.areThereImages = this.uploader.queue.length > 0;
    this.isValid = this.isValidCategory && this.areThereImages;
  }

  onDroped(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.uploader.queue, event.previousIndex, event.currentIndex);
  }
}