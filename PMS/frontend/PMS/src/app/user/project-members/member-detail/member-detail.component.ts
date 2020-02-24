import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/user/user.service";
import { IUser } from "src/app/iuser";
import { ProjectService } from "src/app/project/project.service";
import { IProject } from "src/app/iproject";
import { TaskService } from "src/app/task/task.service";
import { Itask } from "src/app/itask";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  // projectId:any;
  userId: any
  loggedUserId: any
  user: IUser
  projects: IProject[] = [];
  tasks: Itask[] = []
  msg: String
  errorMsg = ''
  showTasks: boolean = false;
  enableChat: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private projectService: ProjectService,
    private taskService: TaskService, private router: Router) {
    this.userId = this.route.snapshot.params.uId;
  }

  ngOnInit() {
    this.enableChat = true;
    this.showTasks = false;
    this.loggedUserId = sessionStorage.getItem('userId')
    this.getUser();
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe(
      data => {
        this.user = data;
        this.msg = '';
        this.projects = []
        this.enableChat = false;
        this.showTasks = false
      //  console.log(this.user);
      },
      error => {
        console.log(error)
      }
    );
  }

  getProjectByUserId(id: number) {
    //console.log("projectbyid");
    this.projectService.getProjectsByUserId(id).subscribe(
      data => {
       // console.log(data);
        this.projects = data
       // console.log(this.projects)
        if (this.projects.length === 0) {
          this.msg = "User has not been assigned on any project";
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  showProject(id: number) {
    this.userId = id;
    this.getProjectByUserId(id);
  }

  showProjectDetail(id: number) {
    // console.log(id)
    // console.log(this.userId)
    this.taskService.getAllTasksByProjectId(id).subscribe(
      data => {
        //console.log(data);
        this.tasks = data;
        this.showTasks = true;
        this.tasks = this.tasks.filter(
          (x) => {
            return x.userId == JSON.stringify(this.userId);
          })
        //console.log(this.tasks)
      },
      error => {
        console.log(error)
      }
    )
  }

  getPriority(priority: number) {
    if (priority == 1) {
      return "red";
    }
    else if (priority == 2) {
      return "yellow";
    }
    else {
      return "green";
    }
  }

  onClickChat(id: number) {
    // console.log('chat button clicked')
    // console.log(id)
    // console.log("this.userId")
    // console.log(this.userId)
    if (id == this.loggedUserId) {
      this.errorMsg = " You cannot chat with Yourself "
      this.enableChat = false;
    } else {
      this.enableChat = true;
    }
    //this.router.navigate(['chat', id])

  }

  onCancelChat() {
    this.enableChat = false;
    this.ngOnInit();
  }

}
