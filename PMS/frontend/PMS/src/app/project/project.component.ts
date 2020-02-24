import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from "src/app/project/project.service";
import { IProject } from "src/app/iproject";
import { Router, NavigationEnd } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: IProject[] = [];
  userId: string;
  msg: string;
  constructor(private projectService: ProjectService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    //  this.submitted = false;
    // this.enableAdd = false;
    //  this.hide = false;
    this.getProjectList();
    // this.projectForm();
    // this.checkUser();
  }

  getProjectList() {
    this.userId = sessionStorage.getItem('userId')
    //this.projectService.getProjectsByManagerId(this.userId).subscribe(
    this.projectService.getProjects().subscribe(
      data => {
        this.projects = data;
        if (this.projects.length == 0) {
          this.msg = "No data"
        }
        else if (this.projects.success === false) {
          this.msg = "Session Timeout, Please login again"
          this.projects = [];
        }
       // console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  onClickDetails(id: number) {
    this.router.navigate(['project', id])
  }
}
