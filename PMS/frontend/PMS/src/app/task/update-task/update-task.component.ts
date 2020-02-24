import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { TaskService } from "src/app/task/task.service";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  hide: boolean;
  updateTaskForm: FormGroup;
  @Input() task: any = {};
  @Output() cancelUpdate: EventEmitter<any> = new EventEmitter();
  @Output() updateTask: EventEmitter<any> = new EventEmitter();
  submitted:boolean=false;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) { }

  ngOnInit() {
    this.submitted=false;
    this.updateForm();
  }

  updateForm() {
    this.updateTaskForm = this.formBuilder.group({
      backlogId: new FormControl({value:this.task.backlogId, disabled:true}, Validators.required),
      taskId: new FormControl({value:this.task.taskId, disabled:true}, Validators.required),
      userId: [this.task.userId],
      title: new FormControl({value:this.task.title, disabled:true}, Validators.required),
      desc: [this.task.desc, Validators.required],
      startDate: [this.task.startDate, Validators.required],
      endDate: [this.task.endDate, Validators.required],
      priority: [this.task.priority, Validators.required],
      status: [this.task.status, Validators.required]
    });
  }
  get f() { return this.updateTaskForm.controls; }

  submitForm() {
    this.submitted=true;
    if(this.updateTaskForm.invalid){
      return;
    }

    // console.log(this.task.taskId)
    // console.log(this.updateTaskForm.value)

    this.taskService.updateTask(this.updateTaskForm.value, this.task.taskId).subscribe(
      data => {
        //console.log(data);
        this.updateTask.emit();
      },
      error => {
        console.log(error);
      }
    );
  }
  
  onclickCancel() {
    this.cancelUpdate.emit();

  }

}
