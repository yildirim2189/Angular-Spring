import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;
  errorMessage: string = '';
  isRegisterButtonDisabled: boolean = false;
  

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.isRegisterButtonDisabled = true;
    this.authService.register(this.form).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.isRegisterButtonDisabled = false;
      },
      err => {
        console.error(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.isSuccessful = false;
        this.isRegisterButtonDisabled = false;
      }
    );
  }

}
