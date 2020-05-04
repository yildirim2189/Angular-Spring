import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './services/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';

const LANG_KEY = "language";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  currentThemeObs: Observable<string>;
  themeClass: string = "default-theme";

  constructor(
    private themeService: ThemeService, 
    private translateService: TranslateService,
    private overlayContainer: OverlayContainer){
    overlayContainer.getContainerElement().classList.add(this.themeClass);
  }

  ngOnInit(): void {
    this.currentThemeObs = this.themeService.theme;
    this.currentThemeObs.subscribe(currentTheme => {
      // Remove old theme class from overlay container
      this.overlayContainer.getContainerElement().classList.remove(this.themeClass);
      this.themeClass = currentTheme;
      // Add new theme class to overlay container
      this.overlayContainer.getContainerElement().classList.add(this.themeClass);
    });
    this.themeClass = this.themeService.getTheme();

    this.translateService.onLangChange.subscribe(
      data => window.localStorage.setItem(LANG_KEY, data.lang)
    );

    let savedLang = window.localStorage.getItem(LANG_KEY);
    if(savedLang !== undefined && savedLang !== null){
      this.translateService.use(savedLang);
    }
  }
}