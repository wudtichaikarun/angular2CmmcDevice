import { Component, OnInit, Input } from '@angular/core';
import { MoreDetailComponent } from '../more-detail/more-detail.component';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() content;

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  showDetail(content) {
    const dialogRet = this.dialog.open(MoreDetailComponent);
    dialogRet.componentInstance.device = content;
  }

}
