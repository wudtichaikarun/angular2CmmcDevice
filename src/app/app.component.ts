import { Component } from '@angular/core';
import { MqttServiceOptions,MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hostname:string = 'q.cmmc.io';
  port:number = 59001;
  path:string = '/mqtt';

  setConfig (config) {
    console.log(config)
    this.hostname = config.host;
    this.port = config.port;
  }

  MQTT_SERVICE_OPTIONS: MqttServiceOptions = {
    hostname: this.hostname,
    port: this.port,
    path: this.path,
  };


}
