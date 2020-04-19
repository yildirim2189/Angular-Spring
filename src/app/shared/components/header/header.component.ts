import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarEvent: EventEmitter<any> = new EventEmitter();    
  isDarkTheme: Observable<boolean>;

  constructor(private tokenStorageService: TokenStorageService, private translate: TranslateService
    , private themeService: ThemeService) { }

  ngOnInit() {  
    this.isDarkTheme = this.themeService.isDarkTheme;
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

  changeTr(){this.translate.use('tr')}
  changeEn(){this.translate.use('en')}

  /*if(this.tokenStorageService.getUser() == null && this.tokenStorageService.getToken() == null){
    this.router.navigateByUrl("/login");
    return false;
}*/
/*
toggleDarkTheme(checked: boolean) {
  this.themeService.setDarkTheme(checked);
}*/
changeTheme(theme){
  this.themeService.setTheme(theme);
}

}
