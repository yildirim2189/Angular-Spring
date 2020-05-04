import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private translate: TranslateService) { }

  getErrorMessage(code: number){
    if(code == undefined){
      code = 900;
    }
    return this.translate.instant("error." + code);
  }
}
