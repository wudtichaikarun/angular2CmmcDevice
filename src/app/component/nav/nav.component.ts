import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  @Output() clickOpenNav: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  btnSettingsClick() {
    this.clickOpenNav.emit();
  }

  refresh() {
    window.location.reload();
  }

}
