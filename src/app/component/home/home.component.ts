import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MockData } from '../../shared/mock-data';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

// ngx-mqtt

import { MqttService, MqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from '../../shared/AppConstants';

export type QoS = 0 | 1 | 2;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  // mock data
  devices = [];
  devicesUnique: object = {};
  // real data
  devicesReal: any;

  // mqtt
  topic: string = 'CMMC/plug001';
  retain: boolean = true;
  qos: QoS = 0;
  filter: string = 'MARU/#';
  message: string;
  myOtherMessage$: Observable<MqttMessage>;

  get state() {
    return this.mqtt.state;
  }

  get observables() {
    return this.mqtt.observables;
  }

  // variable for sharch and filter
  devicesStatus: object[] = [
    {value: AppConstants.FILTER_ALL, viewValue: 'SHOW ALL'},
    {value: AppConstants.FILTER_ONLINE, viewValue: 'ON LINE'},
    {value: AppConstants.FILTER_OFFLINE, viewValue: 'OFF LINE'}
  ];
  selectValue: string = AppConstants.FILTER_ALL;
  states: string[];
  stateCtrl: FormControl;
  filteredStates: any;

  constructor(private mqtt: MqttService,
              private cdRef: ChangeDetectorRef) {

    // search and auto complete
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));

    mqtt.onConnect.subscribe((e) => console.log('onConnect', e));
    mqtt.onError.subscribe((e) => console.log('onError', e));
    mqtt.onClose.subscribe(() => console.log('onClose'));
    mqtt.onReconnect.subscribe(() => console.log('onReconnect'));

    mqtt.onMessage.subscribe((e) => {
      const retained = e.retain;
      const payload = e.payload.toString();
      // console.log(`retained = ${retained}`);
      this.devicesReal = payload;
      if (e.topic.indexOf('/status') > 0) {
        try {
          const object = JSON.parse(payload);
          // assume that retained devices are died
          if (retained) {
            object.info.client_id = undefined;
          }
          this.devicesUnique[object.d.myName] = object;
          this.devices = Object.keys(this.devicesUnique).map((v, k) => this.devicesUnique[v]);
        } catch (exception) {
          console.error(exception);
        }

      }
    });
  }

  // subscribe call by btn
  subscribe(filter: string): void {
    this.mqtt.observe(filter);
  }

  // Unsubscribe call by btn
  unsubscribe(filter: string): void {
    this.mqtt.observables[filter] = null;
  }

  // filterStates call by btn key prefix vaule ex. 'MARU/#'
  filterStates(val: string) {
    return val ? this.states.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.states;
  }

  ngOnInit() {
    this.getDeviceName(this.devices);
    this.subscribe(this.filter);
  }

  // create array devices.d.myName
  getDeviceName(devices) {
    this.states = devices.map((device) => device.d.myName);
  }

  // filter device all | online | ofline
  onMySelectChange(value: string) {
    this.selectValue = value;
  }

  // sharch and pagination
  displayFn(state): string {
    return state;
  }

  valueChange(state: string) {
    this.selectValue = state;
  }

}

interface ObjectInResponseArray {
  info: object;
  d: object;
}
