import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  MdButtonModule,
  MdSidenavModule,
  MdIconModule,
  MdDialogModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { NavComponent } from './component/nav/nav.component';
import { HomeComponent } from './component/home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { ConfigDataComponent } from './component/config-data/config-data.component';
import { ShowMoreDetailComponent } from './component/home/show-more-detail/show-more-detail.component';

const routes: Routes = [
    // {
    //     path: '', redirectTo:'config',
    //     pathMatch: 'full'

    // },
    {
        path: 'home',
        component: HomeComponent
    }]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    ConfigDataComponent,
    ShowMoreDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MdButtonModule,
    MdSidenavModule,
    MdIconModule,
    MdDialogModule
  ],
   entryComponents: [
    ShowMoreDetailComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
