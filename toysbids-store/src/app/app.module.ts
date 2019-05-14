import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { SelectDropDownModule } from 'ngx-select-dropdown'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuctionComponent } from './auction/auction.component';
import { AuctionListComponent } from './auction/auction-list/auction-list.component';
import { AuctionDetailComponent } from './auction/auction-detail/auction-detail.component';
import { AuctionNewComponent } from './auction/auction-new/auction-new.component';
import { NotificationComponent } from './notification/notification.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuctionBeginComponent } from './auction/auction-begin/auction-begin.component';

import { BsDatepickerModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import {HttpClientModule} from "@angular/common/http";
import { ImagePreview } from './auction/auction-new/image-preview.directive';
import { AuctionNewHeaderComponent } from './auction/auction-new-header/auction-new-header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    FileDropDirective,
    ImagePreview,

    AuctionComponent,
    AuctionListComponent,
    AuctionDetailComponent,
    AuctionNewComponent,
    NotificationComponent,
    HeaderComponent,
    FooterComponent,
    AuctionBeginComponent,
    AuctionNewHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SelectDropDownModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NoopAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }