import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ShowMoreDetailComponent } from './show-more-detail/show-more-detail.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  status: string = "connect";
  deveces: object[] = [
    {
      deviceName: 'E8p8266',
      status: 'connect'
    },{
      deviceName: 'RasberyPi',
      status: 'disconnect'
    },{
      deviceName: 'Arduino Nano',
      status: 'disconnect'
    },{
      deviceName: 'Arduino Mini',
      status: 'disconnect'
    },{
      deviceName: 'E8p8266',
      status: 'disconnect'
    },{
      deviceName: 'RasberyPi',
      status: 'disconnect'
    },{
      deviceName: 'Arduino Nano',
      status: 'connect'
    },{
      deviceName: 'Arduino Mini',
      status: 'disconnect'
    },
    {
      deviceName: 'E8p8266',
      status: 'connect'
    },{
      deviceName: 'RasberyPi',
      status: 'disconnect'
    },{
      deviceName: 'Arduino Nano',
      status: 'disconnect'
    },{
      deviceName: 'Arduino Mini',
      status: 'disconnect'
    }
  ]
  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  showDetail(){
    console.log("hello");
    this.dialog.open(ShowMoreDetailComponent);
  }
}
