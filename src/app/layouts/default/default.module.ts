import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TasksComponent } from 'src/app/modules/tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { authInterceptorProviders } from 'src/app/helper/auth.interceptor';
import { TaskService } from 'src/app/services/task.service';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme.service';
import { CustomMatPaginatorIntl } from "../../helper/CustomMatPaginatorIntl";
import { FlexLayoutModule } from '@angular/flex-layout';
// Angular Material 
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';

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
    FlexLayoutModule,
    TranslateModule,
    // Material Modules
    MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule,
    MatTableModule, MatProgressBarModule, MatIconModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatTabsModule, MatSnackBarModule,
    MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,
    MatTooltipModule, MatSelectModule, MatExpansionModule,
  ],
  providers: [
    DashboardService,
    ThemeService,
    authInterceptorProviders,
    TaskService,
    {provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}
  ]
})
export class DefaultModule { }
