import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import {MainService} from './services/main.service'
import {ApiService} from './services/api.service'
import { HttpClientModule, HttpClient} from '@angular/common/http'; 
import {RouterModule , Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!

import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { IndividualCourseComponent } from './individual-course/individual-course.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AssistanceComponent } from './assistance/assistance.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FilterPipe } from './pipes/filter.pipe';

let appRoutes : Routes = [
  {"path" : "", "component" :HomeComponent,"canActivate": [AuthGuard] },
  {"path" : "home", "component" : HomeComponent ,"canActivate": [AuthGuard] },
  {"path" : "courses", "component" : AllCoursesComponent ,"canActivate": [AuthGuard] },
  {"path" : "courses/:id", "component" : IndividualCourseComponent ,"canActivate": [AuthGuard] },
  {"path" : "addCourse", "component" : AddEventComponent ,"canActivate": [AuthGuard]},
  {"path" : "editActiveCourse/:id", "component" : EditCourseComponent  ,"canActivate": [AuthGuard]},
  {"path" : "assistanceControl/:id", "component" : AssistanceComponent  ,"canActivate": [AuthGuard]},
  {"path" : "todo", "component" : TodoListComponent  ,"canActivate": [AuthGuard]},
  {"path" : "calendar", "component" : CalendarComponent  ,"canActivate": [AuthGuard]},
  {"path" : "login", "component" : LoginRegisterComponent},
  {"path" : "**", "component" : ErrorComponent}
  
]





@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    HomeComponent,
    ErrorComponent,
    SidebarComponent,
    AllCoursesComponent,
    IndividualCourseComponent,
    AddEventComponent,
    EditCourseComponent,
    AssistanceComponent,
    TodoListComponent,
    CalendarComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FullCalendarModule 
  ],
  providers: [MainService,ApiService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
