import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ShowMoreDetailComponent } from './show-more-detail/show-more-detail.component';
import { MockData } from '../../shared/mock-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  status: boolean = true;
  devices: object[] = MockData;

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  showDetail(device){
    let dialogRet = this.dialog.open(ShowMoreDetailComponent);
    dialogRet.componentInstance.device = device;
  }
}
