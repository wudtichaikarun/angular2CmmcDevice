import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  status: string = "connect";
  deveces: string[] = ["1","2","3","4","1","2","3","4","1","2","3","4"]
  constructor() { }

  ngOnInit() {
  }

}
