import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import {
  MdButtonModule,
  MdSidenavModule,
  MdIconModule,
  MdDialogModule,
  MdSelectModule,
  MdAutocompleteModule,
  MdInputModule,
  MdCardModule
} from '@angular/material';

// Conponent
import { AppComponent } from './app.component';
import { NavComponent } from './component/nav/nav.component';
import { HomeComponent } from './component/home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { ConfigDataComponent } from './component/config-data/config-data.component';
import { CardComponent } from './component/card/card.component';
import { MoreDetailComponent } from './component/more-detail/more-detail.component';

// Try to use Service
import { MqttServiceService } from './shared/mqtt-service.service';

// Pipe filter
import { DevicesFilter } from './shared/devices-filter';

// Ngx-mqtt
import { KeysPipe, StateToStringPipe, StateToClassPipe } from './shared/pipes';
import {
  MqttMessage,
  MqttModule,
  MqttService,
  OnMessageEvent,
  MqttServiceOptions
} from 'ngx-mqtt';

const servicMqtt = new MqttServiceService();
const mqttServiceOption = servicMqtt.MQTT_SERVICE_OPTIONS;

export function mqttServiceFactory() {
  return new MqttService(mqttServiceOption);
}


const routes: Routes = [
  // {
  //   path: '', redirectTo: 'home',
  //   pathMatch: 'full'
  // }, {
  //   path: 'home',
  //   component: HomeComponent
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    ConfigDataComponent,
    DevicesFilter,
    CardComponent,
    MoreDetailComponent,
    KeysPipe,
    StateToStringPipe,
    StateToClassPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    }),
    FormsModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdSidenavModule,
    MdIconModule,
    MdDialogModule,
    MdSelectModule,
    MdAutocompleteModule,
    MdInputModule,
    MdCardModule
  ],
  entryComponents: [
    MoreDetailComponent
  ],
  providers: [MqttServiceService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
