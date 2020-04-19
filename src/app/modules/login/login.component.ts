import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Variables
  form: any = {};
  isLoggedIn: boolean = false;
  hide: boolean = true;
  isLoginFailed: boolean = false;
  errorMessage: string = '';
  roles: string[] = [];
  isLoginButtonDisabled: boolean = false;
  isShowSpinner: boolean = false;

  param = { value: 'world'}

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService, private router: Router) { 

    }

  ngOnInit() {
    if(this.tokenStorageService.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
    }
  }

  onSubmit(){
    this.isLoginButtonDisabled = true;
    this.isShowSpinner = true;
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
        this.router.navigateByUrl("/");
      },
      err => {
        console.error(err);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isLoginButtonDisabled = false;
        this.isShowSpinner = false;
      }
    );
    
  }

}
