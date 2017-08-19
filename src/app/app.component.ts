import { Component } from '@angular/core';
import { MqttServiceOptions,MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  MQTT_SERVICE_OPTIONS: MqttServiceOptions = {
    hostname: 'q.cmmc.io',
    port: 59001,
    path: '/mqtt'
  };

  // mqttServiceFactory() {
  //   return new MqttService(this.MQTT_SERVICE_OPTIONS);
  // }

}
