import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  setTheme(theme: any) {
    if(theme=== "t1"){
      this._curTheme.next("default");
    }else if(theme === "t2"){
      this._curTheme.next("light-theme")
    }else{
      this._curTheme.next("dark-theme")
    }
    
  }

  private _curTheme: Subject<string> = new Subject<string>();
  private _darkTheme: Subject<boolean> = new Subject<boolean>();
  isDarkTheme= this._darkTheme.asObservable();
  theme = this._curTheme.asObservable();
  
  constructor() { }

  setDarkTheme(isDarkTheme: boolean){
    this._darkTheme.next(isDarkTheme);
  }
}
