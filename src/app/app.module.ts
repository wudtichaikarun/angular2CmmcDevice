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
  MdInputModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { NavComponent } from './component/nav/nav.component';
import { HomeComponent } from './component/home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { ConfigDataComponent } from './component/config-data/config-data.component';
import { ShowMoreDetailComponent } from './component/home/show-more-detail/show-more-detail.component';
import { DevicesFilter } from './component/home/devices-filter';

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
    ShowMoreDetailComponent,
    DevicesFilter
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
  ],
  entryComponents: [
    ShowMoreDetailComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
