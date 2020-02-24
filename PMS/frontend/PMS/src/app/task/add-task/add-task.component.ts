import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { first } from "rxjs/operators";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { TaskService } from "src/app/task/task.service";
import { BacklogService } from "src/app/backlog/backlog.service";
import { Itask } from "src/app/itask";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  addTaskForm: FormGroup;
  submitted: boolean = false;
  hide = false;
  @Input() projectId: any;
  @Input() backlogId: any;
  tasks: Itask[] = [];
  @Output() added:EventEmitter<any>=new EventEmitter();
  @Output() canceled:EventEmitter<any>=new EventEmitter();
 

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, backlogService: BacklogService) { }

  ngOnInit() {
    this.submitted = false;
    this.taskSubmit();
  }


  taskSubmit() {
    this.addTaskForm = this.formBuilder.group({
      backlogId: [this.backlogId, Validators.required],
      taskId: ['', Validators.required],
      userId: [''],
      title: ['', Validators.required],
      desc: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  get f() { return this.addTaskForm.controls; }

  submitForm() {
    this.submitted = true;
   // console.log(this.addTaskForm.value)
    if (this.addTaskForm.invalid) {
      return;
    }
    this.taskService.addTask(this.addTaskForm.value).subscribe(
      data => {
       // console.log(data);
        
       // this.taskSubmit();
        this.added.emit();
      },
      error => {
        console.log(error);
      }
    )
  }

  onclickCancel() {
    this.canceled.emit();
  }

}
