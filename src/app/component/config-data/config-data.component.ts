import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-data',
  templateUrl: './config-data.component.html',
  styleUrls: ['./config-data.component.css']
})
export class ConfigDataComponent implements OnInit {
  @Output() CancleClick: EventEmitter<any> = new EventEmitter()

  clientCHK: boolean = false;
  userPassword: boolean = false;

  port: number;
  prefix: string;
  username: string;
  password: string;
  clientId: string;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  btnCancleClick(){
    this.CancleClick.emit();
  }

  onSubmit () {
    console.log(`
                port = ${ this.port }
                prefix = ${ this.prefix }
                username= ${ this.username }
                password = ${ this.password }
                clientId = ${ this.clientId }
                `)
  }
}
