import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule, MatProgressBarModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatSnackBarModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatTooltipModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { TasksComponent } from 'src/app/modules/tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { authInterceptorProviders } from 'src/app/helper/auth.interceptor';
import { UserService } from 'src/app/services/user.service';
import { TranslateModule } from '@ngx-translate/core';
 
@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    TasksComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTooltipModule,
    TranslateModule
  ],
  providers: [
    DashboardService,
    authInterceptorProviders,
    UserService
  ]
})
export class DefaultModule { }
