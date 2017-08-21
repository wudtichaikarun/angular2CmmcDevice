import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
//import { MqttServiceService } from '../../shared/mqtt-service.service'
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

// ngx-mqtt
import { MqttServiceOptions, MqttService, MqttMessage } from 'ngx-mqtt';
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
  @ViewChild('searchValue') searchValue;
  @Output() clickOpenNav: EventEmitter<any> = new EventEmitter();
  devices: object[];
  devicesUnique: object = {};
  cardShow: boolean = true;
  // Pagination
  // static PER_PAGE = 10;

  topic: string = 'CMMC/plug001';
  retain: boolean = true;
  qos: QoS = 0;
  prefix: string = 'MARU/#';
  message: string;

  setConfig (config) {
    //this.subscribe(config.prefix);
    //this.cardShow = false;
    //this.devices = [{}]
     console.log(config)
    // this.hostname = config.host;
    // this.port = config.port;
  }

  // myOtherMessage$: Observable<MqttMessage>;
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
  arrayDeviceName: string[];
  stateCtrl: FormControl;
  filteredStates: any;

  constructor(private mqtt: MqttService, private cdRf: ChangeDetectorRef) {

    // Sharch and autocompleat
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(deviceName => this.filterStates(deviceName));

    // Mqtt event
    mqtt.onConnect.subscribe((e) => console.log('onConnect', e));
    mqtt.onError.subscribe((e) => console.log('onError', e));
    mqtt.onClose.subscribe(() => console.log('onClose'));
    mqtt.onReconnect.subscribe(() => console.log('onReconnect'));
    mqtt.onMessage.subscribe((e) => {
      const retained = e.retain;
      const payload = e.payload.toString();
      // console.log(`retained = ${retained}`);
      const doAsync = () => {
        return new Promise((resolve, reject) => {
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
            resolve(this.devices);
          }
        });
      };

      doAsync().then((devices) => {
        this.getDeviceName(devices);
      });

    });
  }

  // Step 2 Subscribe call by ngOnInit
  subscribe(prefix: string): void {
    this.mqtt.observe(prefix);
  }

  // Unsubscribe call by btn
  unsubscribe(prefix: string): void {
    this.mqtt.observables[prefix] = null;
  }

  // FilterStates call by btn key prefix vaule ex. 'MARU/#'
  filterStates(deviceName: string) {
    return deviceName ? this.arrayDeviceName.filter((dName) => {
        if (dName !== undefined)
          return dName.toString().toLowerCase().indexOf(deviceName.toLowerCase()) === 0;
      })
      : this.arrayDeviceName;
  }

  // Step 1
  ngOnInit() {
    //this.connect(this.prefix)
    this.subscribe(this.prefix);
  }

  // connect(prefix){
  //   this._mqttService.connectMqtt(prefix).subscribe((data) => {
  //     console.log(data)
  //     if (data !== undefined) {
  //       this.devices = data;
  //     }
  //   })
  // }

  // Create array devices.d.myName
  getDeviceName(devices) {
    this.arrayDeviceName = devices.map((device) => device.d.myName);
  }

  // Filter device all | online | ofline
  onMySelectChange(value: string) {
    event.preventDefault();
    this.selectValue = value;
    this.searchValue.nativeElement.value = '';
  }

  // Sharch and pagination
  displayFn(dName): string {
    return dName;
  }

  // Sherch
  autoCompleteValueChange(dName: string) {
    this.selectValue = dName;
  }

  /*
  // Pagingtion
  getDevice(page = 1) {
    const startIndex = (page - 1 ) * HomeComponent.PER_PAGE;
    const devicesPage = this.devices
      .slice(startIndex, startIndex + HomeComponent.PER_PAGE);
    console.log(`
                devicesPage:${devicesPage}
                currentPage:${page}
                totalPages:${Math.ceil(this.devices.length / HomeComponent.PER_PAGE)}
                `)
    return {
      devicesPage,
      currentPage: page,
      totalPages: Math.ceil(this.devices.length / HomeComponent.PER_PAGE)
    }
  }*/

  refresh() {
    window.location.reload();
  }

  btnSettingsClick() {
    this.clickOpenNav.emit();
  }

}
