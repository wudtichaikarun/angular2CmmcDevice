import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-more-detail',
  templateUrl: './show-more-detail.component.html',
  styleUrls: ['./show-more-detail.component.css']
})
export class ShowMoreDetailComponent implements OnInit {
  device : Dictionary

  constructor () {}

  infoKeys () : Array<string> {
    return Object.keys(this.device.info)
  }

  dKeys () : Array<string> {
    return Object.keys(this.device.d)
  }

  ngOnInit () {
  }

}

interface Dictionary {
  [index : string ] : string
}
