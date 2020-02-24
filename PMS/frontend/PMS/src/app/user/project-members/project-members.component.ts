import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "src/app/user/user.service";
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from "@angular/router";
import { IUser } from "src/app/iuser";
import { ProjectService } from "src/app/project/project.service";
import { IProject } from "src/app/iproject";
import { TaskService } from "src/app/task/task.service";
import { Itask } from "src/app/itask";

@Component({
  selector: 'app-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: ['./project-members.component.css']
})
export class ProjectMembersComponent implements OnInit {
  projectId: any
  members: IUser[] = [];
  
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,
    private projectService: ProjectService, private taskService: TaskService) {
    this.projectId = this.route.snapshot.params.projectId;
  }

  ngOnInit() {
    this.getMembers();
    //this.getUserMember()
  }

  getMembers() {
    this.userService.getUsersByProjectId(this.projectId).subscribe(
      data => {
       // console.log(data)
        this.members = data
      },
      error => {
        console.log(error)
      }
    )
  }

  onClickDetail(id: number) {
    this.router.navigate(['member-detail', id])
  }


}
