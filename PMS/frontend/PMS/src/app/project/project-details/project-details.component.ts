import { Component, OnInit } from '@angular/core';
import { first } from "rxjs/operators";
import { IProject } from "src/app/iproject";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ProjectService } from "src/app/project/project.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  project: IProject;
  enableAdd: boolean = false;
  submitted: boolean = false;
  hide: boolean = false;
  isAdmin: boolean = false;
  enableEdit: any = {};
  enableEditIndex: number = null;
  addProjectForm: FormGroup;
  mySubscription: any;

  projectId: number;
  managerId: string;

  constructor(private projectService: ProjectService, private router: Router,
    private formBuilder: FormBuilder, private route: ActivatedRoute) {
    // console.log("here 1")
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    // this.mySubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     console.log("here 2")
    //     // Trick the Router into believing it's last link wasn't previously loaded
    //     this.router.navigated = false;
    //   }
    // });
    this.projectId = this.route.snapshot.params.projectId;
  }

  ngOnInit() {
    this.submitted = false;
    this.enableAdd = false;
    this.hide = false;
    this.projectForm();
    this.checkUser();
    this.getProject();

  }

  getProject() {
   // console.log(this.projectId)
    this.projectService.getProjectsById(this.projectId).subscribe(
      data => {
        this.project = data;
       // console.log("Checking project by id")
        //console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  checkUser() {
    if (sessionStorage.getItem('role') === 'admin') {
      this.isAdmin = true;
    }
  }


  projectForm() {
    this.addProjectForm = this.formBuilder.group({
      managerId: ['', Validators.required],
      id: ['', Validators.required],
      name: ['', Validators.required],
      team_member: ['', Validators.required],
      scrum_master: ['', Validators.required],
      status: ['', Validators.required]
    })
  }
  get f() { return this.addProjectForm.controls; }

  submitForm() {
    this.submitted = true;
    if (this.addProjectForm.invalid) {
      return;
    }
    this.projectService.addProject(this.addProjectForm.value).
      subscribe(
      data => {
       // console.log(data);
        this.hide = true;
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
      )
  }

  onClickEdit(project: IProject) {
    this.enableEdit = project;
  }

  onClickDelete(projectId: number) {
    this.projectService.deleteProject(projectId).subscribe(
      data => {
       // console.log(data);
        this.getProject();
      },
      error => {
        console.log(error);
      }
    );
  }

  onClickUpdate(project: IProject) {
    this.enableEdit = {};
    this.projectService.updateProject(project).subscribe(
      data => {
       // console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  onClickCancel() {
    this.enableEdit = {};
  }

  addProject() {
    this.enableAdd = true;
    this.submitted = false;
    this.addProjectForm.reset();
  }

  onCancel() {
    this.enableAdd = false;
  }

  onMemberClick(id:number){
   // console.log("Project Details member")
    this.router.navigate(['project-members', id])
  }

  onGroupClick(id:number){
   // console.log("Group chat clicked")
    // console.log(id)
      this.router.navigate(['chat', id])
  }

}
