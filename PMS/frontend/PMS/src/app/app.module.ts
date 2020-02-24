import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HeaderComponent } from './header/header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptorService } from "src/app/authentication/auth-interceptor.service";
import { UserListComponent } from "src/app/user/user-list/user-list.component";
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { AssignTaskComponent } from './task/assign-task/assign-task.component';
import { UpdateTaskComponent } from './task/update-task/update-task.component';
import { BacklogComponent } from './backlog/backlog.component';
import { AddBacklogComponent } from './backlog/add-backlog/add-backlog.component';
import { BacklogDetailComponent } from './backlog/backlog-detail/backlog-detail.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { ProjectMembersComponent } from './user/project-members/project-members.component';
import { MemberDetailComponent } from './user/project-members/member-detail/member-detail.component';
import { ChatComponent } from './chat/chat.component';
import { GroupChatComponent } from './chat/group-chat/group-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    UserComponent,
    PagenotfoundComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    UserListComponent,
    ProjectDetailsComponent,
    TaskComponent,
    AddTaskComponent,
    AssignTaskComponent,
    UpdateTaskComponent,
    BacklogComponent,
    AddBacklogComponent,
    BacklogDetailComponent,
    UserDetailComponent,
    ProjectMembersComponent,
    MemberDetailComponent,
    ChatComponent,
    GroupChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
