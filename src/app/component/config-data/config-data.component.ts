import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-data',
  templateUrl: './config-data.component.html',
  styleUrls: ['./config-data.component.css']
})
export class ConfigDataComponent implements OnInit {

  clientCHK: boolean = false;
  userPassword: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.clientCHK)
  }

}
