import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  isSideBarOpened = true;

  constructor() {}

  ngOnInit() {}

  toggleSideBar(event){
    this.isSideBarOpened = !this.isSideBarOpened;
  }
}
