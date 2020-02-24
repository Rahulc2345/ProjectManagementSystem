import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Itask } from "src/app/itask";
import { TaskService } from "src/app/task/task.service";
import { UserService } from "src/app/user/user.service";
import { IUser } from "src/app/iuser";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {

  @Output() assigned:EventEmitter<any>=new EventEmitter();
  tasks: Itask[] = [];
  users: IUser[] = [];
  userId: string;
  taskId: string;
  message: string = '';
  isAssigned: boolean
  //isCanceled: boolean
  subscription:Subscription

  constructor(private taskService: TaskService, private userService: UserService) { }

  ngOnInit() {
    this.isAssigned = false;
    //this.isCanceled = false;
    this.message = '';
    this.getTasks();
    this.getUsers();
  }

  getTasks() {
    this.subscription=this.taskService.getAllTasks().subscribe(
      data => {
        this.tasks = data;
        //console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  getUsers() {
    this.subscription=this.userService.getUserList().subscribe(
      data => {
        this.users = data;
        //console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  onAssignTask() {
    if (this.taskId && this.userId) {
      this.subscription=this.taskService.assignTask(this.taskId, this.userId).subscribe(
        data => {
          //console.log(data);
          this.assigned.emit();
        },
        error => {
          console.log(error);
        }
      );
      this.isAssigned = true;
    }
    else {
      this.message = "TaskId and UserId cannot be left blank";
     // console.log(this.message);
    }

  }

  onCancelTask() {
    // this.isCanceled=true;
     this.message='';
    this.isAssigned=true;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
