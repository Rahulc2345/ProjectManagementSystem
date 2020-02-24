import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Itask } from "src/app/itask";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:3000/routes/tasks/";

  getAllTasks() {
    return this.http.get<Itask[]>(this.baseUrl);
  }
  getAllTasksByProjectId(projectId:number) {
    return this.http.get<Itask[]>(this.baseUrl+ "project/"+projectId);
  }


  getTaskById(id: number) {
    return this.http.get<Itask>(this.baseUrl + id);
  }

  addTask(task: Itask) {
    return this.http.post(this.baseUrl + "add", task);
  }

  assignTask(taskId: string, userId: string) {
    return this.http.put(this.baseUrl+"update/user/" +  taskId, {"userId":userId});
  }

  deleteTask(taskId) {
    return this.http.delete(this.baseUrl+"delete/" + taskId);
  }

  updateTask(task:Itask, taskId:number) {
   // console.log("sdfsdf "+task)
    return this.http.put(this.baseUrl+"update/" + taskId, task);
  }
}
