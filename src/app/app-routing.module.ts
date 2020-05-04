import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { AreaComponent } from './shared/widgets/area/area.component';
import { TasksComponent } from './modules/tasks/tasks.component';
import { NoAuthGuard } from './helper/no-auth-guard';
import { NonAuthenticatedComponent } from './layouts/non-authenticated/non-authenticated.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CalendarComponent } from './modules/calendar/calendar.component';

const routes: Routes = [
  // Logged in user routes
  {path: '', component: DefaultComponent, children: [
    {path: '', component: DashboardComponent},
    {path: 'posts', component: PostsComponent},
    {path: 'icons', component: PostsComponent},
    {path: 'tasks', component: TasksComponent},
    {path: 'calendar', component: CalendarComponent}
  ], canActivate: [NoAuthGuard]},

  // Non-logged user
  {path: 'login', component: NonAuthenticatedComponent},
  // Page not exist
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
