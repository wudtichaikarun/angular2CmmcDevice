import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MockData } from '../../shared/mock-data';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

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
  devices = MockData.filter((devices) => {
    return typeof devices !== 'string'
  })
  // real data
  devicesReal: any;

  //mqtt
  topic: string = 'CMMC/plug001';
  retain: boolean =true;
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

      // const output$ =  mqtt.onMessage.take(4)
      // output$.subscribe((e) => {
      //   console.log('output', e.payload.toString())
      //  this.devicesReal = e.payload.toString()
      // })

      mqtt.onMessage.subscribe((e) => {
        // const filterPayload = payload.filter((items) =>{
        //   return typeof items !== 'string'
        // })

        const payload = e.payload.toString()
        this.devicesReal = payload
        const payloadType = typeof payload

      //  const payloadRespose:ObjectInResponseArray = JSON.parse(payload).forEach(item => {
      //     console.log(item);
      //   })

        console.log(`payload type = ${payloadType}`)
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
  subscribe(filter: string): void {
    this.mqtt.observe(filter);
  }

  // Unsubscribe call by btn
  unsubscribe(filter: string): void {
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

interface ObjectInResponseArray {
  info: object;
  d: object;

}
