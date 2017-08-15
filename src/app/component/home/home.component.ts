import { Component, OnInit } from '@angular/core';
import { MockData } from '../../shared/mock-data';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  devices: object[] = MockData

  // variable for sharch and filter
  devicesStatus: object[] = [
    { value: 'all', viewValue: 'SHOW ALL' },
    { value: 'online', viewValue: 'ON LINE' },
    { value: 'ofline', viewValue: 'OFF LINE' }
  ]
  selectValue: string = 'all';
  states: string[];
  stateCtrl: FormControl;
  filteredStates: any;

  constructor () {
    this.stateCtrl = new FormControl()
    this.filteredStates = this.stateCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterStates(name));
  }

  filterStates (val: string) {
    return val ? this.states.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
               : this.states
  }

  ngOnInit () {
    this.getDeviceName(this.devices);
  }

  // create array devices.d.myName
  getDeviceName (devices) {
    const deviceName = devices.map((device) => {
      return device.d.myName;
    })
    this.states = deviceName;
  }

  // filter device all | online | ofline
  onMySelectChange (value: string) {
    this.selectValue = value;
  }

  // sharch and pagination
  displayFn (state): string {
    return state;
  }
  valueChange (value: string) {
    this.selectValue = value;
  }

}
