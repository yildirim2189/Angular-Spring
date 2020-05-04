import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const THEME_KEY = "user-theme"

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  themes = [
    { name: "Dark Pink", key: "default-theme" },
    { name: "Theme 2", key: "light-theme" },
    { name: "Theme 3", key: "dark-theme" },
    {name: "Theme 4", key: "last-theme"}
  ];

  private _curTheme: Subject<string> = new Subject<string>();
  theme = this._curTheme.asObservable();

  getThemes(){ return this.themes; }

  getTheme(){
    let theme = window.localStorage.getItem(THEME_KEY);
    if(theme != null && theme != undefined && theme != "null"){
      return theme;
    }
    return "default-theme";
  }

  saveTheme(theme: string){
    window.localStorage.setItem(THEME_KEY, theme)
  }

  setTheme(theme: string) {
    this._curTheme.next(theme);
    this.saveTheme(theme);
  }
}
