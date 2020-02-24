import { Component, OnInit, Input } from '@angular/core';
import { IBacklog } from "src/app/ibacklog";
import { BacklogService } from "src/app/backlog/backlog.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-backlog-detail',
  templateUrl: './backlog-detail.component.html',
  styleUrls: ['./backlog-detail.component.css']
})
export class BacklogDetailComponent implements OnInit {

  enableEdit: any = {}
  backlogs: IBacklog[] = [];
  projectId: number;

  constructor(private backlogService: BacklogService, private route: ActivatedRoute) {
    this.projectId = this.route.snapshot.params.backlogId
  }

  ngOnInit() {
    this.getBacklogList();
    // console.log(this.projectId)
  }

  getBacklogList() {
    this.backlogService.getBacklogsByProjectId(this.projectId).subscribe(
      data => {
        this.backlogs = data;
        // console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  onClickEdit(backlog) {
    this.enableEdit = backlog;
  }

  onClickUpdate(backlog) {
    this.backlogService.updateBacklog(backlog).subscribe(
      data => {
        // console.log(data);
        this.enableEdit = {};
      },
      error => {
        console.log(error);
      }
    )
  }

  onClickCancel() {
    this.enableEdit = {};
  }

  onClickDelete(backlogId: number) {
    this.backlogService.deleteBacklog(backlogId).subscribe(
      data => {
        // console.log(data);
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    )
  }




}
