import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

// ngx-mqtt
import { MqttService, MqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

export type QoS = 0 | 1 | 2;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('searchValue') searchValue;

  devices:object[] ;
  devicesUnique: object = {};
  sharchValue: string = 'hello'

  // Mqtt variable
  topic: string = 'CMMC/plug001';
  retain: boolean = true;
  qos: QoS = 0;
  filter: string = 'MARU/#';
  message: string;
  // myOtherMessage$: Observable<MqttMessage>;

  get state() {
    return this.mqtt.state;
  }

  get observables() {
    return this.mqtt.observables;
  }

  // variable for sharch and filter
  devicesStatus: object[] = [
    {value: 'all', viewValue: 'SHOW ALL'},
    {value: 'online', viewValue: 'ON LINE'},
    {value: 'ofline', viewValue: 'OFF LINE'}
  ];
  selectValue: string = 'all';
  states: string[];
  stateCtrl: FormControl;
  filteredStates: any;

  constructor(
    private mqtt: MqttService,
    private cdRef: ChangeDetectorRef) {

      // Sharch and autocompleat
      this.stateCtrl = new FormControl();
      this.filteredStates = this.stateCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterStates(name));

      // Mqtt event
      mqtt.onConnect.subscribe((e) => console.log('onConnect', e));
      mqtt.onError.subscribe((e) => console.log('onError', e));
      mqtt.onClose.subscribe(() => console.log('onClose'));
      mqtt.onReconnect.subscribe(() => console.log('onReconnect'));
      mqtt.onMessage.subscribe((e) => {
        const retained = e.retain;
        const payload = e.payload.toString();
        // console.log(e)
        // console.log(`retained = ${retained}`);
        const doAsync = () => {
          return new Promise ((resolve, reject) => {
            if (e.topic.indexOf('/status') > 0) {
              const object = JSON.parse(payload);
              // assume that retained devices are died
              if (retained) {
                object.info.client_id = undefined;
              }
              this.devicesUnique[object.d.myName] = object;
              this.devices = Object.keys(this.devicesUnique).map((v, k) => {
                console.log(`v: ${v} ||  k: ${k}`);
                return this.devicesUnique[v];
              })
              console.log(this.devices);
              resolve(this.devices);
            }
          })
        }

        doAsync().then((devices) =>{
          this.getDeviceName(devices);
        })
      });
  }

  // public unsafePublish(topic: string, message: string): void {
  //   this.mqtt.unsafePublish(topic, message, {qos: 1, retain: true});
  // }

  // public publish(topic: string, message: string, retain = false, qos: QoS = 0): void {
  //   this.mqtt
  //     .publish(topic, message, { retain, qos })
  //     .subscribe((err) => console.log(err));
  // }

  // Subscribe call by btn
  subscribe(filter: string): void {
    this.mqtt.observe(filter);
  }

  // Unsubscribe call by btn
  unsubscribe(filter: string): void {
    this.mqtt.observables[filter] = null;
  }

  // FilterStates call by btn key prefix vaule ex. 'MARU/#'
  filterStates(val: string) {
    return val ? this.states.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.states;
  }

  ngOnInit() {
    this.subscribe(this.filter);
    //console.log(`myOtherMessage: ${this.myOtherMessage$}`)
  }

  // Create array devices.d.myName
  getDeviceName(devices) {
    const deviceName = devices.map((device) => {
      return device.d.myName;
    });
    this.states = deviceName;
  }

  // Filter device all | online | ofline
  onMySelectChange(value: string) {
    event.preventDefault();
    this.selectValue = value;
    this.searchValue.nativeElement.value = '';
  }

  // Sharch and pagination
  displayFn(state): string {
    return state;
  }

  // Sherch
  autoCompleteValueChange(state: string) {
    this.selectValue = state;
  }

}
