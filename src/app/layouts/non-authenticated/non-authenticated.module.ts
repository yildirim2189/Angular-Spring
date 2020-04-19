import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonAuthenticatedComponent } from './non-authenticated.component';
import { MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatCardModule, MatStepperModule, MatToolbarModule, MatMenuModule, MatTooltipModule } from '@angular/material';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { RegisterComponent } from 'src/app/modules/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NonAuthenticatedComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatProgressBarModule,
    MatCardModule,
    SharedModule,
    MatStepperModule,
    TranslateModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule
  ],
  exports: [NonAuthenticatedComponent]
})
export class NonAuthenticatedModule { }
