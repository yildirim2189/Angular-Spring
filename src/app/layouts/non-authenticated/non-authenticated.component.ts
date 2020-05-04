import { Component, OnInit, HostBinding } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-non-authenticated',
  templateUrl: './non-authenticated.component.html',
  styleUrls: ['./non-authenticated.component.scss']
})
export class NonAuthenticatedComponent implements OnInit {

  @HostBinding('class.theme-bg-1') bgColor = true;
  themes = this.themeService.getThemes();

  constructor(private translateService: TranslateService, private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.setTheme(this.themeService.getTheme());    
  }

  changeLanguage(language: string){
    this.translateService.use(language);
  }

  changeTheme(theme: string){
    this.themeService.setTheme(theme);
  }
}
