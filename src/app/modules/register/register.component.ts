import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;
  errorCode: number;
  isRegisterButtonDisabled: boolean = false;
  isShowSpinner = false;
  hidePassword: boolean = true;

  constructor(private authService: AuthService, private errorService: ErrorService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm){
    this.isRegisterButtonDisabled = true;
    this.isShowSpinner = true;
    this.authService.register(this.form).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.isRegisterButtonDisabled = false;
        this.isShowSpinner = false;
        f.resetForm();
      },
      err => {
        console.error(err);
        this.errorCode = err.error.code;
        this.isSignUpFailed = true;
        this.isSuccessful = false;
        this.isRegisterButtonDisabled = false;
        this.isShowSpinner = false;
      }
    );
  }

}
