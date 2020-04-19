import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-non-authenticated',
  templateUrl: './non-authenticated.component.html',
  styleUrls: ['./non-authenticated.component.scss']
})
export class NonAuthenticatedComponent implements OnInit {

  constructor(private translate: TranslateService, private themeService: ThemeService) { }

  ngOnInit() {
    
  }

  changeTr(){
    this.translate.use('tr');
  }
  changeEn(){
    this.translate.use('en');
  }

  changeTheme(theme){
    this.themeService.setTheme(theme);
  }
}
