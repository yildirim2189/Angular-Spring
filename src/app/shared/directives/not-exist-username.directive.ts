import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Directive({
  selector: '[notExist]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: NotExistUsernameDirective,
    multi: true,
  }]
})
export class NotExistUsernameDirective implements Validator{
  constructor(private authService: AuthService){}
  validate(control: AbstractControl): ValidationErrors {
    /*
    if(control.value === 'xxx'){
      return {"exists": true}
    }else{
      return null;
    }*/
    
    if(control.value !== undefined && control.value !== null && control.value.length > 2 && control.value.trim().length > 2 ){
      console.log("entered control!");
        return this.authService.checkIfUsernameExist(control.value);
      
    }else{
      console.log("not entered")
      return null;
    }
  }

  registerOnValidatorChange?(fn: () => void): void {
    
  }
}
