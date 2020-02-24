import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { BacklogService } from "src/app/backlog/backlog.service";

@Component({
  selector: 'app-add-backlog',
  templateUrl: './add-backlog.component.html',
  styleUrls: ['./add-backlog.component.css']
})
export class AddBacklogComponent implements OnInit {

  submitted: boolean;
  addBackLogForm: FormGroup;
  @Input() projectId: any;
  @Input() projects: any;
  @Output() addEmit: EventEmitter<any> = new EventEmitter();
  @Output() cancelEmit: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private backlogService: BacklogService) { }

  ngOnInit() {

    this.submitted = false;
    //console.log(this.projects)
    this.backlogSubmit();
  }
  backlogSubmit() {
    this.addBackLogForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      backlogId: ['', Validators.required],
      title: ['', Validators.required],
      requirement: ['', Validators.required],
      created_at: ['', Validators.required],
      updated_at: ['', Validators.required]
    })
  }

  get f() { return this.addBackLogForm.controls; }

  submitForm() {
    this.submitted = true;
    if (this.addBackLogForm.invalid) {
      return;
    }
    // console.log(2222)
    // console.log(this.addBackLogForm.value)
    // console.log(333)
    //this.addBackLogForm.value.projectId=this.projectId
    console.log(this.addBackLogForm.value)
    this.backlogService.addBacklog(this.addBackLogForm.value, this.addBackLogForm.value.projectId).subscribe(
      data => {
        // console.log(data);
        this.addEmit.emit();
      },
      error => {
        console.log(error);
      }
    )
  }

  onclickCancel() {
    this.cancelEmit.emit()
  }


}
