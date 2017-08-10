import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ShowMoreDetailComponent } from './show-more-detail/show-more-detail.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  status: boolean = true;
  devices: object[] =
  [
    {
    "info": {
        "ssid": "Romantic wifi",
        "flash_size": 4194304,
        "flash_id": "1640c8",
        "chip_id": "f32c3a",
        "sdk": "1.5.3(aec24ac9)",
        "mac": "18:FE:34:F3:2C:3A",
        "client_id": "15936570",
        "device_id": "15936570",
        "prefix": "MARU",
        "ip": "192.168.1.23",
        "version": 0.96
    },
    "d": {
        "myName": "Romantic-001",
        "millis": 36081,
        "temperature_c": 0,
        "humidity_percent_rh": 0,
        "state": 0,
        "heap": 41536,
        "rssi": -58,
        "counter": 4,
        "subscription": 1
    }
},    {
    "info": {
        "ssid": "Romantic wifi",
        "flash_size": 4194304,
        "flash_id": "1640c8",
        "chip_id": "f32c3a",
        "sdk": "1.5.3(aec24ac9)",
        "mac": "18:FE:34:F3:2C:3A",
        "client_id": "15936570",
        "device_id": "15936570",
        "prefix": "MARU",
        "ip": "192.168.1.6",
        "version": 0.96
    },
    "d": {
        "myName": "Romantic-001",
        "millis": 36081,
        "temperature_c": 0,
        "humidity_percent_rh": 0,
        "state": 0,
        "heap": 41536,
        "rssi": -58,
        "counter": 4,
        "subscription": 1
    }
},{
    "info": {
        "ssid": "Romantic wifi",
        "flash_size": 4194304,
        "flash_id": "1640c8",
        "chip_id": "f32c3a",
        "sdk": "1.5.3(aec24ac9)",
        "mac": "18:FE:34:F3:2C:3A",
        "client_id": null,
        "device_id": "15936570",
        "prefix": "MARU",
        "ip": "192.168.22.33",
        "version": 0.96
    },
    "d": {
        "myName": "SmartHome-001",
        "millis": 36081,
        "temperature_c": 0,
        "humidity_percent_rh": 0,
        "state": 0,
        "heap": 41536,
        "rssi": -58,
        "counter": 4,
        "subscription": 1
    }
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
