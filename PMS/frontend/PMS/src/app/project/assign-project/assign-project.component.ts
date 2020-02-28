import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/user/user.service";
import { IUser } from "src/app/iuser";
import { IProject } from "src/app/iproject";
import { ProjectService } from "src/app/project/project.service";

@Component({
  selector: 'app-assign-project',
  templateUrl: './assign-project.component.html',
  styleUrls: ['./assign-project.component.css']
})
export class AssignProjectComponent implements OnInit {

  users: IUser[] = []
  projects: IProject[] = []
  projectId: any;
  userId: any
  //isAssigned: boolean = false;
  message: string = '';

  constructor(private userService: UserService, private projectService: ProjectService) { }

  ngOnInit() {
    //this.isAssigned = false;
    this.message = '';
    this.getProjects();
    this.getUsers();
  }

  getProjects() {
    this.projectService.getProjects().subscribe(
      data => {
        this.projects = data;
        console.log(this.projects);
      },
      error => {
        console.log(error);
      }
    );
  }

  getUsers() {
    this.userService.getUserList().subscribe(
      data => {
        this.users = data;
        // this.users = this.users.filter(
        //   (x) => {
        //     return x.projectId == null 
        //   }
        // )
        console.log(this.users);
      },
      error => {
        console.log(error);
      }
    );
  }

  onAssignProject() {
    console.log(this.userId + ".... " + this.projectId)
    if (this.userId == undefined || this.projectId == undefined) {
      this.message = "Please select project and a user"
    } else {
      this.userService.assignProject(this.projectId, this.userId).subscribe(
        data => {
          //console.log(data);
          this.message = data
        },
        error => {
          console.log(error);
        }
      )
      this.ngOnInit()
    }
  }

  onCancelProject() {
    this.ngOnInit()
  }
}
