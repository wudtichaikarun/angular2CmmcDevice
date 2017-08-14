import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AppComponent } from './app.component';
import { NavComponent } from './component/nav/nav.component';
import { HomeComponent } from './component/home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { ConfigDataComponent } from './component/config-data/config-data.component';
import { CardComponent } from './component/card/card.component';
import { MoreDetailComponent } from './component/more-detail/more-detail.component';
// pipe filter
import { DevicesFilter } from './shared/devices-filter';

const routes: Routes = [
// {
//     path: '', redirectTo:'config',
//     pathMatch: 'full'
// },
  {
    path: 'home',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    ConfigDataComponent,
    DevicesFilter,
    CardComponent,
    MoreDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
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
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
