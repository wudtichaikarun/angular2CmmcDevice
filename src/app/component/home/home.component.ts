import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MockData } from '../../shared/mock-data';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

//ngx-mqtt
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
  // mock data
  devices: object[] = MockData;
  // real data
  devicesReal: object[];

  //mqtt
  public topic: string = 'CMMC/plug001';
  public retain: boolean =true;
  public qos: QoS = 0;
  public filter: string = 'MARU/#';
  public message: string;


  public myOtherMessage$: Observable<MqttMessage>;

  public get state() {
    return this.mqtt.state;
  }

  public get observables() {
    return this.mqtt.observables;
  }

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

  constructor (
    private mqtt: MqttService,
    private cdRef: ChangeDetectorRef) {
      // this.mqtt.observe('CMMC/plug001')
      //     .subscribe((msg: MqttMessage) => {
      //       this.myMessage = msg.payload.toString()
      //     });

      // sharch and autocompleat
      this.stateCtrl = new FormControl()
      this.filteredStates = this.stateCtrl.valueChanges
          .startWith(null)
          .map(name => this.filterStates(name));

      mqtt.onConnect.subscribe((e) => console.log('onConnect', e));
      mqtt.onError.subscribe((e) => console.log('onError', e));
      mqtt.onClose.subscribe(() => console.log('onClose'));
      mqtt.onReconnect.subscribe(() => console.log('onReconnect'));
      mqtt.onMessage.subscribe((e) => {
        //console.log('onMessage', e.payload.toString())
        this.devicesReal = e.payload.toString()
        console.log(this.devicesReal)
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

  // subscribe call by btn
  public subscribe(filter: string): void {
    this.mqtt.observe(filter);
  }

  // Unsubscribe call by btn
  public unsubscribe(filter: string): void {
    this.mqtt.observables[filter] = null;
  }

  // filterStates call by btn key prefix vaule ex. 'MARU/#'
  filterStates (val: string) {
    return val ? this.states.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
               : this.states
  }

  ngOnInit () {
    this.getDeviceName(this.devices);
    // console.log(this.myMessage)

    this.subscribe(this.filter)
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
  valueChange (state: string) {
    this.selectValue = state;
  }

}
