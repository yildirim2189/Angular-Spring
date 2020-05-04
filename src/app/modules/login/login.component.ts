import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn: boolean = false;
  hidePassword: boolean = true;
  isLoginFailed: boolean = false;
  isLoginButtonDisabled: boolean = false;
  isShowSpinner: boolean = false;
  errorCode: number;

  param = { value: 'world'}

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService, private router: Router,
    private snackbar: MatSnackBar, private translate: TranslateService, private errorService: ErrorService) {}

  ngOnInit() {
    if(this.tokenStorageService.getToken()){
      this.isLoggedIn = true;
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
        this.snackbar.open(this.translate.instant('login.success'), null, {
          duration: 2000,
          horizontalPosition: "center",
          verticalPosition: "top"
        });
        setTimeout(() => this.router.navigateByUrl("/") , 2000);
      },
      err => {
        console.error(err);
        this.errorCode = err.error.code;
        this.isLoginFailed = true;
        this.isLoginButtonDisabled = false;
        this.isShowSpinner = false;
      }
    );
  }
}
