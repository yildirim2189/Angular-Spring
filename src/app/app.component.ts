import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  myTheme: Observable<string>;
  theme: string = "default";

  constructor(private themeService: ThemeService){

  }
  ngOnInit(): void {
    // this.isDarkTheme = this.themeService.isDarkTheme;
    this.myTheme = this.themeService.theme;
    this.myTheme.subscribe(a => { console.log(a, "test"); this.theme = a;})
  }

}
