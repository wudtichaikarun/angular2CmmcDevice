import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-more-detail',
  templateUrl: './more-detail.component.html',
  styleUrls: ['./more-detail.component.css']
})

export class MoreDetailComponent implements OnInit {
  device: Dictionary;

  constructor() {}

  infoKeys(): Array<string> {
    return Object.keys(this.device.info);
  }

  dKeys(): Array<string> {
    return Object.keys(this.device.d);
  }

  ngOnInit() {
  }

}

interface Dictionary {
  [index: string ]: string;
}
