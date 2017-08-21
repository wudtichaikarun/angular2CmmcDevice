import { Injectable, ChangeDetectorRef } from '@angular/core';
import { MqttServiceOptions, MqttService, MqttMessage } from 'ngx-mqtt';

export type QoS = 0 | 1 | 2;

@Injectable()
export class MqttServiceService {
  devices: object[];
  devicesUnique: object = {};

  hostname:string = 'q.cmmc.io';
  port:number = 59001;
  path:string = '/mqtt';
  topic: string = 'CMMC/plug001';
  retain: boolean = true;
  qos: QoS = 0;
  prefix: string = 'MARU/#';

  MQTT_SERVICE_OPTIONS: MqttServiceOptions = {
    hostname: this.hostname,
    port: this.port,
    path: this.path,
  };

  constructor(
    private mqtt?: MqttService,
    private cdRf?: ChangeDetectorRef
  ) { }

 /* connectMqtt(prefix){
    this.subscribe(prefix)

    this.mqtt.onConnect.subscribe((e) => console.log('onConnect', e));
    this.mqtt.onError.subscribe((e) => console.log('onError', e));
    this.mqtt.onClose.subscribe(() => console.log('onClose'));
    this.mqtt.onReconnect.subscribe(() => console.log('onReconnect'));
    return this.mqtt.onMessage.subscribe((e) => {
      const retained = e.retain;
      const payload = e.payload.toString();
      // console.log(`retained = ${retained}`);
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

  get state() {
    return this.mqtt.state;
  }

  get observables() {
    return this.mqtt.observables;
  }

  // Step 2 Subscribe call by ngOnInit
  subscribe(prefix: string): void {
    this.mqtt.observe(prefix);
  }

  // Unsubscribe call by btn
  unsubscribe(prefix: string): void {
    this.mqtt.observables[prefix] = null;
  }*/

}
