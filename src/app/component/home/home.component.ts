import { Component, OnInit } from '@angular/core'
import { MdDialog } from '@angular/material'
import { ShowMoreDetailComponent } from './show-more-detail/show-more-detail.component'
import { MockData } from '../../shared/mock-data'
import { FormControl } from '@angular/forms'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  status: boolean = true
  devices: object[] = MockData
  devicesStatus = [
    {value: 'all', viewValue: 'SHOW ALL'},
    {value: 'online', viewValue: 'ON LINE'},
    {value: 'ofline', viewValue: 'OFF LINE'}
  ]
  selectValue: string = "all"
  states = []
  stateCtrl: FormControl;
  filteredStates: any;

  constructor (public dialog: MdDialog) {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterStates(name));
  }

  filterStates (val: string) {
    return val ? this.states.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
               : this.states;
  }

  ngOnInit () {
    this.getDeviceName(this.devices)
  }

  getDeviceName(devices){
    // for(var i = 0; i< devices.length; i++){
    //   const name = devices[i].d.myName
    //   this.states[i] = name
    // }
    const deviceName = devices.map((device) => {
      return device.d.myName
    })
    this.states = deviceName
  }

  showDetail (device) {
    let dialogRet = this.dialog.open(ShowMoreDetailComponent)
    dialogRet.componentInstance.device = device
  }

  onMySelectChange (value) {
    this.selectValue = value
    console.log(value)
  }

  displayFn (state): string {
    this.selectValue = state
    //console.log(state)
    return state
  }

  valueChange (value) {
    this.selectValue = value
  }
}
