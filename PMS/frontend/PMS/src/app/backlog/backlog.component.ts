import { Component, OnInit, Input } from '@angular/core';
import { BacklogService } from "src/app/backlog/backlog.service";
import { IBacklog } from "src/app/ibacklog";
import { Router } from "@angular/router";
import { ProjectService } from "src/app/project/project.service";
import { IProject } from "src/app/iproject";

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  projects: IProject[] = [];
  @Input() projectId: number
  enableEdit: any = {}
  backlogs: IBacklog[] = [];
  isEnable = false;
  constructor(private backlogService: BacklogService, private router: Router, private projectService: ProjectService) { }

  ngOnInit() {
    this.isEnable = false;
    this.getBacklogList();
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects().subscribe(
      data => {
        this.projects = data;
        //console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }


  getBacklogList() {
    this.backlogService.getBacklogs().subscribe(
      data => {
        this.backlogs = data;
        //console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  onClickDetail(id: number) {
    this.router.navigate(['backlog', id])
  }

  addBacklog() {
    this.isEnable = true;
  }

  onBacklogCancel() {
    this.ngOnInit()
  }
}
