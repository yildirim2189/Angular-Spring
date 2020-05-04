import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  @HostBinding('class.theme-bg-1') bgColor = true;
  constructor() { }

  ngOnInit() {
  }

}
