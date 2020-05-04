import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarEvent: EventEmitter<any> = new EventEmitter();    
  themes = this.themeService.getThemes();

  constructor(private tokenStorageService: TokenStorageService, private translateService: TranslateService, 
    private themeService: ThemeService) { }

  ngOnInit() {  
    this.themeService.setTheme(this.themeService.getTheme());
  }

  toggleSideBar(){
    this.toggleSideBarEvent.emit();
    setTimeout( () => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  signOut(){
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  changeLanguage(language: string){
    this.translateService.use(language);
  }

  changeTheme(theme: string){
    this.themeService.setTheme(theme);
  }
}
