import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonAuthenticatedComponent } from './non-authenticated.component';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { RegisterComponent } from 'src/app/modules/register/register.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
// Angular Material
import { MatTabsModule } from '@angular/material/tabs'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatCardModule } from '@angular/material/card'
import { MatStepperModule } from '@angular/material/stepper'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule } from '@angular/material/menu'
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [NonAuthenticatedComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TranslateModule,
    FlexLayoutModule,
    // Angular Material 
    MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatToolbarModule, MatMenuModule, MatTooltipModule,
    MatStepperModule, MatProgressBarModule, MatCardModule,
  ],
  exports: [NonAuthenticatedComponent]
})
export class NonAuthenticatedModule { }